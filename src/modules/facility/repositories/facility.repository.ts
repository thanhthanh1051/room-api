import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { facilities } from '@prisma/client';

@Injectable()
export class FacilityRepository {
  constructor(private prisma: PrismaService) { }

  async findAllActive(): Promise<facilities[]> {
    return this.prisma.facilities.findMany({
      where: {
        is_active: true,
      },
      orderBy: {
        sort_order: 'asc',
      },
    });
  }
}
