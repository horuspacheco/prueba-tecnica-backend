import { Module } from '@nestjs/common';
import { NotificationsModule } from './notifications.module';

@Module({
	imports: [NotificationsModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
