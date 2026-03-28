import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const apiKey = req.headers['x-api-key'] || req.headers['X-API-KEY'];
    if (!apiKey) throw new UnauthorizedException('API key missing');

    const merchant = await this.prisma.merchant.findUnique({ where: { api_key: String(apiKey) } });
    if (!merchant) throw new UnauthorizedException('Invalid API key');
    if (merchant.status !== 'active') throw new ForbiddenException('Merchant inactive');

    req.merchant = merchant;
    return true;
  }
}
