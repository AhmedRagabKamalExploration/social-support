export const envConfig = {
  RAPID_API_KEY: process.env.RAPID_API_KEY ?? '',
  RAPID_API_HOST: process.env.RAPID_API_HOST ?? '',
  RAPID_API_URL: process.env.RAPID_API_URL ?? '',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? '',
  SENTRY_DSN:
    process.env.SENTRY_DSN ??
    'https://d17bb3d2cfbc7863f711081987a59442@o4505669530877952.ingest.us.sentry.io/4509302082437120',
};
