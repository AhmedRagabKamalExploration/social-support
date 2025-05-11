import 'server-only';

import { envConfig } from '@/config/env-config';

const { RAPID_API_KEY, RAPID_API_HOST } = envConfig;

/**
 * HTTP error with additional response data
 */
type HttpErrorData = {
  detail: string | Array<{ msg: string }>;
};

export class HttpError extends Error {
  status: number;
  data: HttpErrorData | undefined;

  constructor(message: string, status: number, data?: HttpErrorData) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Default configuration for fetch requests
 */
const defaultOptions: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Typed HTTP client for making API requests with proper error handling
 */
export async function http<T = unknown>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const requestId = Math.random().toString(36).slice(2, 9);
  console.log(`[HTTP:${requestId}] Request: ${options.method || 'GET'} ${url}`);
  const startTime = Date.now();

  const mergedOptions: RequestInit = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': RAPID_API_HOST,
    },
  };

  const response = await fetch(url, mergedOptions);

  if (!response.ok) {
    // Clone the response before trying to read it
    const clonedResponse = response.clone();

    let errorData;
    try {
      errorData = await clonedResponse.json();
    } catch {
      // If JSON parsing fails, try text
      try {
        errorData = await response.text();
      } catch {
        // If all fails, use a generic error object
        errorData = { message: 'Failed to parse error response' };
      }
    }

    throw new HttpError(
      `Request failed with status ${response.status}`,
      response.status,
      errorData as HttpErrorData,
    );
  }

  // Handle empty responses
  if (
    response.status === 204 ||
    response.headers.get('content-length') === '0'
  ) {
    return {} as T;
  }

  // Handle different content types
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    try {
      const jsonResponse = await response.json();
      console.log(`[HTTP:${requestId}, ${Date.now() - startTime}ms]}`, {
        Response: jsonResponse,
      });
      return jsonResponse as T;
    } catch (error) {
      console.error('Error parsing JSON response:', error);
      console.error(
        `[HTTP:${requestId}, ${Date.now() - startTime}ms] Error: ${(error as Error).message}`,
      );
      return {} as T;
    }
  } else {
    // For non-JSON responses, return as text or empty object
    try {
      return (await response.text()) as unknown as T;
    } catch (error) {
      console.error('Error reading response as text:', error);
      console.error(
        `[HTTP:${requestId}, ${Date.now() - startTime}ms] Error: ${(error as Error).message}`,
      );
      return {} as T;
    }
  }
}

/**
 * Type-safe HTTP client that enforces response type
 * Use when you want to ensure the response matches a specific TypeScript interface
 */
export async function httpWithType<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  return http<T>(url, options);
}
