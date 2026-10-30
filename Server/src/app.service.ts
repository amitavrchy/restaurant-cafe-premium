import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      name: 'Maison Verdant API',
      status: 'ok',
    };
  }

  getHealth() {
    return {
      status: 'ok',
      service: 'maison-verdant-api',
      storage: process.env.STORAGE_MODE === 'postgres' || process.env.DATABASE_URL?.startsWith('postgresql')
        ? 'postgres'
        : 'unknown',
    };
  }
}