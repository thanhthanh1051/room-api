import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { Prisma, rooms } from '@prisma/client';
import { GetRoomListDto } from '../dto/get-room-list.dto';

const PUBLIC_ROOM_CONDITION: Prisma.roomsWhereInput = {
  is_deleted: false,
  is_hidden: false,
  is_available: true,
};

@Injectable()
export class RoomRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findList(query: GetRoomListDto): Promise<{ data: rooms[]; total: number }> {
    const {
      page = 1,
      limit = 12,
      province,
      district,
      ward,
      minPrice,
      maxPrice,
      roomTypeId,
      toiletTypeId,
      parkingTypeId,
      gateLockTypeId,
      curfewTypeId,
      dryingAreaTypeId,
      facilityIds,
      sort,
    } = query;

    const where: Prisma.roomsWhereInput = { ...PUBLIC_ROOM_CONDITION };

    if (province || district || ward) {
      where.addresses = {};
      if (province) where.addresses.province = province;
      if (district) where.addresses.district = district;
      if (ward) where.addresses.ward = ward;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    if (roomTypeId) where.room_type_id = roomTypeId;
    if (toiletTypeId) where.toilet_type_id = toiletTypeId;
    if (parkingTypeId) where.parking_type_id = parkingTypeId;
    if (gateLockTypeId) where.gate_lock_type_id = gateLockTypeId;
    if (curfewTypeId) where.curfew_type_id = curfewTypeId;
    if (dryingAreaTypeId) where.drying_area_type_id = dryingAreaTypeId;

    if (facilityIds) {
      const fIds = facilityIds.split(',').map((id) => id.trim());
      // Find rooms that have ALL these facilities
      where.AND = fIds.map((fId) => ({
        room_facilities: {
          some: {
            facility_id: fId,
          },
        },
      }));
    }

    let orderBy: Prisma.roomsOrderByWithRelationInput = {};
    if (sort === 'price_asc') {
      orderBy = { price: 'asc' };
    } else if (sort === 'price_desc') {
      orderBy = { price: 'desc' };
    } else {
      orderBy = { created_at: 'desc' }; // 'latest' or default
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.rooms.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          addresses: true,
          room_images: {
            where: { is_thumbnail: true },
            take: 1,
          },
          room_facilities: {
            include: { facilities: true },
          },
        },
      }),
      this.prisma.rooms.count({ where }),
    ]);

    return { data, total };
  }

  async findBySlug(slug: string): Promise<rooms | null> {
    return this.prisma.rooms.findFirst({
      where: {
        slug,
        ...PUBLIC_ROOM_CONDITION,
      },
      include: {
        addresses: true,
        room_images: {
          orderBy: { sort_order: 'asc' },
        },
        room_facilities: {
          include: { facilities: true },
        },
        admin_users_rooms_created_byToadmin_users: {
          select: {
            id: true,
            full_name: true,
            email: true,
            phone: true,
            avatar: true,
          },
        },
      },
    });
  }

  async findFeatured(): Promise<rooms[]> {
    return this.prisma.rooms.findMany({
      where: {
        ...PUBLIC_ROOM_CONDITION,
        is_featured: true,
      },
      take: 8,
      include: {
        addresses: true,
        room_images: {
          where: { is_thumbnail: true },
          take: 1,
        },
        room_facilities: {
          include: { facilities: true },
        },
      },
    });
  }

  async findLatest(): Promise<rooms[]> {
    return this.prisma.rooms.findMany({
      where: { ...PUBLIC_ROOM_CONDITION },
      orderBy: { created_at: 'desc' },
      take: 8,
      include: {
        addresses: true,
        room_images: {
          where: { is_thumbnail: true },
          take: 1,
        },
        room_facilities: {
          include: { facilities: true },
        },
      },
    });
  }

  async findRelated(slug: string, district: string): Promise<rooms[]> {
    return this.prisma.rooms.findMany({
      where: {
        ...PUBLIC_ROOM_CONDITION,
        slug: { not: slug },
        addresses: { district },
      },
      take: 8,
      include: {
        addresses: true,
        room_images: {
          where: { is_thumbnail: true },
          take: 1,
        },
        room_facilities: {
          include: { facilities: true },
        },
      },
    });
  }
}
