import { envConfig } from '@/config/env-config';

export function getApiUrl() {
  const { RAPID_API_URL } = envConfig;
  return RAPID_API_URL;
}

export function getFullApiUrl(path: string) {
  return `${getApiUrl()}${path}`;
}
