import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const isDevelopment = process.env.NODE_ENV === 'development';

    return {
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'rootpassword',
      database: process.env.DB_NAME || 'academy_db',
      autoLoadEntities: true,
      synchronize: false, // Mă bazez pe migrații pentru schema
      logging: isDevelopment, // Log queries doar în development
      retryAttempts: 15,
      retryDelay: 3500,
      // Configurări MySQL specifice pentru a evita erorile de conexiune
      extra: {
        connectionLimit: 10,
        acquireTimeout: 60000,
        timeout: 60000,
        reconnect: true,
      },
    };
  }
}
