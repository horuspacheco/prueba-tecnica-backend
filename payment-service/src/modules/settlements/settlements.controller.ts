import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
    const { merchant_id, period_start, period_end } = body;
    return this.service.generate(merchant_id, new Date(period_start), new Date(period_end));
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
