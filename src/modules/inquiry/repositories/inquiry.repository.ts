import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { CreateInquiryDto } from '../dto/create-inquiry.dto';

@Injectable()
export class InquiryRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateInquiryDto) {
    return this.prisma.inquiries.create({
      data: {
        room_id: data.roomId,
        customer_name: data.customerName,
        phone: data.phone,
        zalo: data.zalo,
        facebook: data.facebook,
        message: data.message,
        status: 'pending',
      },
    });
  }
}
