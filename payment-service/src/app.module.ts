import { Module } from '@nestjs/common';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { SettlementsModule } from './modules/settlements/settlements.module';
import { PrismaModule } from './prisma.module';
import { MerchantsModule } from './modules/merchants/merchants.module';

@Module({
	imports: [PrismaModule, TransactionsModule, SettlementsModule, MerchantsModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
