import { Module } from '@nestjs/common';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { SettlementsModule } from './modules/settlements/settlements.module';
import { PrismaModule } from './prisma.module';

@Module({
	imports: [PrismaModule, TransactionsModule, SettlementsModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
