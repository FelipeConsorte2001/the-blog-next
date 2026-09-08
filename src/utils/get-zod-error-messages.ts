import { ZodError } from 'zod';

export function getZodErrorMessages(error: ZodError): string[] {
  return error.issues
    .map(field => {
      if (Array.isArray(field)) return field;
      return field?.message || [];
    })
    .flat()
    .filter(Boolean);
}
