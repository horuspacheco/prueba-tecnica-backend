import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

type Notification = {
  id: string;
  transaction_id: string;
  merchant_id: string;
  event_type: string;
  payload: any;
  status: 'pending' | 'sent' | 'failed';
  attempts: number;
  created_at: string;
};

@Injectable()
export class NotificationsService {
  private store: Notification[] = [];

  create(n: Omit<Notification, 'id' | 'created_at' | 'attempts'>) {
    const notif: Notification = {
      id: randomUUID(),
      ...n,
      attempts: 0,
      created_at: new Date().toISOString(),
    } as Notification;
    this.store.push(notif);
    return notif;
  }

  findAllByMerchant(merchant_id: string, page = 1, limit = 20) {
    const filtered = this.store.filter(s => s.merchant_id === merchant_id);
    const start = (page - 1) * limit;
    return { data: filtered.slice(start, start + limit), total: filtered.length };
  }

  findOne(id: string) {
    return this.store.find(s => s.id === id);
  }
}
