import { Body, Controller, Get, Param, Post, BadRequestException } from '@nestjs/common';
import { SettlementsService } from './settlements.service';

class GenerateDto {
  merchant_id: string;
  period_start: string;
  period_end: string;
}

@Controller('settlements')
export class SettlementsController {
  constructor(private service: SettlementsService) {}

  @Post('generate')
  async generate(@Body() body: GenerateDto) {
    const { merchant_id, period_start, period_end } = body || {} as GenerateDto;
    if (!merchant_id) throw new BadRequestException('merchant_id is required');
    if (!period_start || !period_end) throw new BadRequestException('period_start and period_end are required');
    const start = new Date(period_start);
    const end = new Date(period_end);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) throw new BadRequestException('Invalid period_start or period_end date');
    return this.service.generate(merchant_id, start, end);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
