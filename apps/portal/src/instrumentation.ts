import { type Instrumentation } from 'next';

export function register() {
  // Only register the web vitals in the browser environment
  if (typeof window !== 'undefined') {
    import('@/utils/web-vitals').then(({ registerWebVitals }) => {
      registerWebVitals();
    });
  }
}

// an onRequestError function to track server errors to any custom observability provider
export const onRequestError: Instrumentation.onRequestError = async (
  err,
  request,
  context,
) => {
  if (process.env.NODE_ENV === 'development') {
    console.log({ err, request, context });
  }
  // TODO: send error to a custom error reporting service (Sentry, etc.)
  // Exmaple: to send error to a custom error reporting service
  // await fetch('https://.../report-error', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     message: err.message,
  //     request,
  //     context,
  //   }),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })
};
