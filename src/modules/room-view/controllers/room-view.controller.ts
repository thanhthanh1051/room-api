import { Controller, Post, Param, Ip } from '@nestjs/common';
import { RoomViewService } from '../services/room-view.service';

@Controller('rooms')
export class RoomViewController {
  constructor(private readonly roomViewService: RoomViewService) {}

  @Post(':id/view')
  async trackView(@Param('id') id: string, @Ip() ip: string) {
    await this.roomViewService.trackView(id, ip || '0.0.0.0');
    return {};
  }
}
