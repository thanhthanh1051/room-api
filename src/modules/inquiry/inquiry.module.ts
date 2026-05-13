import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { InquiryController } from './controllers/inquiry.controller';
import { InquiryService } from './services/inquiry.service';
import { InquiryRepository } from './repositories/inquiry.repository';

@Module({
  imports: [PrismaModule],
  controllers: [InquiryController],
  providers: [InquiryService, InquiryRepository],
})
export class InquiryModule {}
