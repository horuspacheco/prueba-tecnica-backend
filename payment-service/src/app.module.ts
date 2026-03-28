import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { SettlementsModule } from './modules/settlements/settlements.module';
import { PrismaModule } from './prisma.module';
import { MerchantsModule } from './modules/merchants/merchants.module';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { AppController } from './app.controller';

@Module({
  imports: [PrismaModule, TransactionsModule, SettlementsModule, MerchantsModule],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
})
export class AppModule {}
