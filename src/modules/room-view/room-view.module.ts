import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { RoomViewController } from './controllers/room-view.controller';
import { RoomViewService } from './services/room-view.service';
import { RoomViewRepository } from './repositories/room-view.repository';

@Module({
  imports: [PrismaModule],
  controllers: [RoomViewController],
  providers: [RoomViewService, RoomViewRepository],
})
export class RoomViewModule {}
