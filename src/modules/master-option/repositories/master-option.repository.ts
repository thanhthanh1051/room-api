import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { master_options } from '@prisma/client';

@Injectable()
export class MasterOptionRepository {
  constructor(private prisma: PrismaService) { }

  async findByCategory(category: string): Promise<master_options[]> {
    return this.prisma.master_options.findMany({
      where: {
        category,
        is_active: true,
      },
      orderBy: {
        sort_order: 'asc',
      },
    });
  }

  async findByCategories(categories: string[]): Promise<master_options[]> {
    return this.prisma.master_options.findMany({
      where: {
        category: {
          in: categories,
        },
        is_active: true,
      },
      orderBy: {
        sort_order: 'asc',
      },
    });
  }
}
