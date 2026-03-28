import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
  constructor(private service: NotificationsService) {}

  @Post('events')
  async receiveEvent(@Body() body: any) {
    // expected body contains transaction_id, merchant_id, event_type, payload
    const { transaction_id, merchant_id, event_type, payload } = body;
    const notif = this.service.create({ transaction_id, merchant_id, event_type, payload, status: 'pending' });
    return notif;
  }

  @Get('notifications')
  async list(@Query('merchant_id') merchant_id: string, @Query('page') page = '1', @Query('limit') limit = '20') {
    const p = parseInt(page as string) || 1;
    const l = Math.min(100, parseInt(limit as string) || 20);
    return this.service.findAllByMerchant(merchant_id, p, l);
  }

  @Get('notifications/:id')
  async get(@Param('id') id: string) {
    const n = this.service.findOne(id);
    if (!n) return { error: 'Not found' };
    return n;
  }
}
