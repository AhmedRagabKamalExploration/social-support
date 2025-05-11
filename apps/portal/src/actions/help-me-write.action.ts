'use server';

import { envConfig } from '@/config/env-config';

export async function helpMeWriteAction(prompt: string, locale = 'en') {
  try {
    // Get API key from environment variable or local storage
    const apiKey = envConfig.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error(
        'OpenAI API key is not set. Please set it in your environment variables or in the application settings.',
      );
    }

    // Determine language instruction based on locale
    const languageInstruction = locale.startsWith('ar')
      ? 'Respond in Arabic language. '
      : '';

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `${languageInstruction}You are a helpful assistant that provides concise and empathetic responses for people applying for social support.`,
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 150,
      }),
    });

    const data: any = await response.json();

    if (data.error) {
      return {
        error: data.error,
        success: true,
        data: null,
      };
    }

    return {
      error: null,
      data: data.choices[0].message.content.trim(),
      success: true,
    };
  } catch (error) {
    return {
      error,
      data: null,
      success: false,
    };
  }
}
