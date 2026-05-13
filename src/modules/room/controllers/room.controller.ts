import { Controller, Get, Param, Query } from '@nestjs/common';
import { RoomService } from '../services/room.service';
import { GetRoomListDto } from '../dto/get-room-list.dto';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async getList(@Query() query: GetRoomListDto) {
    const result = await this.roomService.getList(query);
    // return directly, transform interceptor will pick up result.data and result.meta
    return result;
  }

  @Get('featured')
  async getFeatured() {
    return this.roomService.getFeatured();
  }

  @Get('latest')
  async getLatest() {
    return this.roomService.getLatest();
  }

  @Get(':slug/related')
  async getRelated(@Param('slug') slug: string) {
    return this.roomService.getRelated(slug);
  }

  @Get(':slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.roomService.getBySlug(slug);
  }
}
