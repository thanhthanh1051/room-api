import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { RoomService } from './services/room.service';
import { RoomController } from './controllers/room.controller';
import { RoomRepository } from './repositories/room.repository';

@Module({
  imports: [PrismaModule],
  providers: [RoomService, RoomRepository],
  controllers: [RoomController],
})
export class RoomModule {}
