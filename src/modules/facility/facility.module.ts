import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { FacilityController } from './controllers/facility.controller';
import { FacilityService } from './services/facility.service';
import { FacilityRepository } from './repositories/facility.repository';

@Module({
  imports: [PrismaModule],
  controllers: [FacilityController],
  providers: [FacilityService, FacilityRepository],
  exports: [FacilityService],
})
export class FacilityModule {}
