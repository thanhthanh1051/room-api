import { Injectable } from '@nestjs/common';
import { InquiryRepository } from '../repositories/inquiry.repository';
import { CreateInquiryDto } from '../dto/create-inquiry.dto';

@Injectable()
export class InquiryService {
  constructor(private readonly inquiryRepository: InquiryRepository) {}

  async create(data: CreateInquiryDto) {
    await this.inquiryRepository.create(data);
    return null; // Return nothing, TransformInterceptor handles {"data": null, "message": "Success"} or we could just return empty object
  }
}
