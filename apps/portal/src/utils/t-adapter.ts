/**
 * A translation adapter that manually handles placeholders in translation strings
 * Used for form validation messages across the application
 */
export function createTAdapter(t: any) {
  return (key: string, values?: Record<string, unknown>) => {
    try {
      // Extract the actual message key
      const validationKey = key.replace(/^validation\./, '');

      // First get the raw message template from the translation
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const messageTemplate = t.raw(`validation.${validationKey}` as any);

      // If there are no values to replace, just return the template
      if (!values || typeof messageTemplate !== 'string') {
        return messageTemplate;
      }

      // Manually replace the placeholders with the values
      let result = messageTemplate;
      for (const [key, value] of Object.entries(values)) {
        result = result.replaceAll(
          new RegExp(`{{${key}}}`, 'g'),
          String(value),
        );
      }

      return result;
    } catch (error) {
      console.error('Translation error:', error, 'for key:', key);
      return key.split('.').pop() || key;
    }
  };
}
