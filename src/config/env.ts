class ConfigService {
  private static instance: ConfigService;

  private constructor() {
    this.validate();
  }

  public static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }
    return ConfigService.instance;
  }

  private validate() {
    const requiredEnvs = ['VITE_API_BASE_URL', 'VITE_API_TIMEOUT'] as const;

    requiredEnvs.forEach((key) => {
      const envValue = import.meta.env[key] as string | undefined;
      if (!envValue) {
        throw new Error(`Config missing value for: ${key}`);
      }
    });
  }

  get apiUrl(): string {
    const value = import.meta.env.VITE_API_BASE_URL as string | undefined;
    if (!value) {
      throw new Error('VITE_API_BASE_URL is not defined');
    }
    return value;
  }

  get apiTimeout(): number {
    const value = import.meta.env.VITE_API_TIMEOUT as string | undefined;
    if (!value) {
      throw new Error('VITE_API_TIMEOUT is not defined');
    }
    return parseInt(value, 10);
  }

  public get(key: string, defaultValue = ''): string {
    const value = import.meta.env[key] as string | undefined;
    return value ?? defaultValue;
  }
}

export const config = ConfigService.getInstance();
