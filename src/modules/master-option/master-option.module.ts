import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { MasterOptionController } from './controllers/master-option.controller';
import { MasterOptionService } from './services/master-option.service';
import { MasterOptionRepository } from './repositories/master-option.repository';

@Module({
  imports: [PrismaModule],
  controllers: [MasterOptionController],
  providers: [MasterOptionService, MasterOptionRepository],
  exports: [MasterOptionService],
})
export class MasterOptionModule {}
