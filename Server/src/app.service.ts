import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      name: 'Maison Verdant API',
      status: 'ok',
    };
  }
}
