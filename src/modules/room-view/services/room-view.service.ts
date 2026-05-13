import { Injectable } from '@nestjs/common';
import { RoomViewRepository } from '../repositories/room-view.repository';

@Injectable()
export class RoomViewService {
  constructor(private readonly roomViewRepository: RoomViewRepository) {}

  async trackView(roomId: string, ipAddress: string) {
    await this.roomViewRepository.create(roomId, ipAddress);
    return null; // For TransformInterceptor {"message": "Success"}
  }
}
