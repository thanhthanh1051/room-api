import { Injectable, NotFoundException } from '@nestjs/common';
import { RoomRepository } from '../repositories/room.repository';
import { GetRoomListDto } from '../dto/get-room-list.dto';

@Injectable()
export class RoomService {
  constructor(private readonly roomRepository: RoomRepository) {}

  private mapRoomList(room: any) {
    return {
      id: room.id,
      title: room.title,
      slug: room.slug,
      price: room.price,
      roomArea: room.room_area,
      address: room.addresses,
      thumbnail: room.room_images[0] ? room.room_images[0].image_url : null,
      facilities: room.room_facilities.map((rf: any) => rf.facilities),
      createdAt: room.created_at,
      isFeatured: room.is_featured,
    };
  }

  async getList(query: GetRoomListDto) {
    const { data, total } = await this.roomRepository.findList(query);
    return {
      data: data.map((room) => this.mapRoomList(room)),
      meta: {
        page: query.page || 1,
        limit: query.limit || 12,
        total,
      },
    };
  }

  async getBySlug(slug: string) {
    const room = await this.roomRepository.findBySlug(slug);
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    return {
      id: room.id,
      title: room.title,
      slug: room.slug,
      description: room.description,
      price: room.price,
      deposit: room.deposit,
      electricPrice: room.electric_price,
      waterPrice: room.water_price,
      parkingFee: room.parking_fee,
      serviceFee: room.service_fee,
      roomArea: room.room_area,
      maxPeople: room.max_people,
      maxVehicle: room.max_vehicle,
      genderAllowed: room.gender_allowed,
      floor: room.floor,
      availableFrom: room.available_from,
      googleMapUrl: room.google_map_url,
      address: (room as any).addresses,
      images: (room as any).room_images,
      facilities: (room as any).room_facilities.map((rf: any) => rf.facilities),
      createdBy: (room as any).admin_users_rooms_created_byToadmin_users,
      createdAt: room.created_at,
      updatedAt: room.updated_at,
    };
  }

  async getFeatured() {
    const rooms = await this.roomRepository.findFeatured();
    return rooms.map((room) => this.mapRoomList(room));
  }

  async getLatest() {
    const rooms = await this.roomRepository.findLatest();
    return rooms.map((room) => this.mapRoomList(room));
  }

  async getRelated(slug: string) {
    const currentRoom = await this.roomRepository.findBySlug(slug);
    if (!currentRoom || !(currentRoom as any).addresses) {
      return [];
    }

    const rooms = await this.roomRepository.findRelated(slug, (currentRoom as any).addresses.district);
    return rooms.map((room) => this.mapRoomList(room));
  }
}
