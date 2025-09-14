export const APP_CONFIG = {
  swagger: {
    title: 'API Managementul Studenților și Universităților',
    description:
      'API RESTful pentru gestionarea datelor studenților și universităților',
    version: '1.0.0',
    path: 'api/docs',
    tags: ['students', 'universities'],
  },
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    environment: process.env.NODE_ENV || 'development',
  },
  validation: {
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  },
} as const;
