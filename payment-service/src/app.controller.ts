import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Public } from './common/decorators/public.decorator';

@Public()
@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Get('health')
  async health() {
    try {
      // simple query to verify DB connectivity
      await (this.prisma as any).$queryRaw`SELECT 1`;
      return {
        status: 'ok',
        service: 'payment-service',
        uptime: process.uptime(),
        database: 'connected',
        timestamp: new Date().toISOString(),
      };
    } catch (err) {
      return {
        status: 'error',
        service: 'payment-service',
        uptime: process.uptime(),
        database: 'disconnected',
        timestamp: new Date().toISOString(),
      };
    }
  }
}
