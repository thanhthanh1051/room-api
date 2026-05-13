import { Injectable } from '@nestjs/common';
import { MasterOptionRepository } from '../repositories/master-option.repository';
import { master_options } from '@prisma/client';

@Injectable()
export class MasterOptionService {
  constructor(private masterOptionRepository: MasterOptionRepository) { }

  async getByCategory(category: string): Promise<Partial<master_options>[]> {
    const options = await this.masterOptionRepository.findByCategory(category);
    return options.map((opt) => ({
      id: opt.id,
      code: opt.code,
      name: opt.name,
    }));
  }

  async getGroupedByCategories(
    categoriesStr: string,
  ): Promise<Record<string, Partial<master_options>[]>> {
    const categories = categoriesStr.split(',').map((c) => c.trim());
    const options = await this.masterOptionRepository.findByCategories(categories);

    const grouped: Record<string, Partial<master_options>[]> = {};
    categories.forEach((cat) => {
      grouped[cat] = [];
    });

    options.forEach((opt) => {
      if (grouped[opt.category]) {
        grouped[opt.category].push({
          id: opt.id,
          code: opt.code,
          name: opt.name,
        });
      }
    });

    return grouped;
  }
}
