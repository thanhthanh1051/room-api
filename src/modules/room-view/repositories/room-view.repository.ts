import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/prisma.service';

@Injectable()
export class RoomViewRepository {
  constructor(private prisma: PrismaService) {}

  async create(roomId: string, ipAddress: string) {
    return this.prisma.room_views.create({
      data: {
        room_id: roomId,
        ip_address: ipAddress,
      },
    });
  }
}
