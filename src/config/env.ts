import { z } from 'zod';

/**
 * Environment Variables Validation Schema
 * Defines validation rules for each environment variable
 */
const envSchema = z.object({
  // API Configuration
  VITE_API_BASE_URL: z
    .string()
    .url('VITE_API_BASE_URL must be a valid URL format')
    .describe('Base URL of the API server'),

  VITE_API_TIMEOUT: z
    .number()
    .int('VITE_API_TIMEOUT must be an integer')
    .positive('VITE_API_TIMEOUT must be a positive number')
    .default(30000)
    .describe('Timeout for API requests (milliseconds)'),

  // Port Configuration
  VITE_PORT: z
    .number()
    .int('VITE_PORT must be an integer')
    .positive('VITE_PORT must be a positive number')
    .default(3000)
    .describe('Port to run the dev server'),

  // Environment Mode
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development')
    .describe('Application running environment'),
});

type Env = z.infer<typeof envSchema>;

/**
 * Parse environment variables from import.meta.env
 * import.meta.env returns all values as strings
 */
function parseEnvironmentVariables(): Record<string, unknown> {
  const rawEnv = import.meta.env as Record<string, string | undefined>;

  return {
    VITE_API_BASE_URL: rawEnv.VITE_API_BASE_URL,
    VITE_API_TIMEOUT: rawEnv.VITE_API_TIMEOUT ? parseInt(rawEnv.VITE_API_TIMEOUT, 10) : undefined,
    VITE_PORT: rawEnv.VITE_PORT ? parseInt(rawEnv.VITE_PORT, 10) : undefined,
    NODE_ENV: rawEnv.MODE ?? process.env.NODE_ENV ?? 'development',
  };
}

/**
 * Validate and initialize environment variables
 * If validation fails, display detailed error messages to console
 */
function initializeEnv(): Env {
  try {
    const parsedEnv = parseEnvironmentVariables();
    const validatedEnv = envSchema.parse(parsedEnv);

    if (process.env.NODE_ENV === 'development') {
      console.log('✓ Environment variables loaded successfully:', {
        VITE_API_BASE_URL: validatedEnv.VITE_API_BASE_URL,
        VITE_API_TIMEOUT: validatedEnv.VITE_API_TIMEOUT,
        VITE_PORT: validatedEnv.VITE_PORT,
        NODE_ENV: validatedEnv.NODE_ENV,
      });
    }

    return validatedEnv;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const zodError = error;
      console.error('❌ Environment validation failed:', {
        errors: zodError.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
          code: issue.code,
        })),
      });
    } else {
      console.error('❌ Unexpected error during environment initialization:', error);
    }

    const errorMessage = 'Failed to initialize environment variables. See console for details.';
    throw new Error(errorMessage, { cause: error });
  }
}

/**
 * Exported env object - validated once during application startup
 * Use throughout the project: import { env } from '@/config'
 */
export const env: Env = initializeEnv();

// Export schema type for reuse
export type { Env };
export { envSchema };
