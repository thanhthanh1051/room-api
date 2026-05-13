import { Controller, Post, Body } from '@nestjs/common';
import { InquiryService } from '../services/inquiry.service';
import { CreateInquiryDto } from '../dto/create-inquiry.dto';

@Controller('inquiries')
export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) {}

  @Post()
  async create(@Body() createInquiryDto: CreateInquiryDto) {
    await this.inquiryService.create(createInquiryDto);
    return {};
  }
}
