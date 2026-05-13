import { Injectable } from '@nestjs/common';
import { FacilityRepository } from '../repositories/facility.repository';
import { facilities } from '@prisma/client';

@Injectable()
export class FacilityService {
  constructor(private facilityRepository: FacilityRepository) { }

  async getAllActive(): Promise<Partial<facilities>[]> {
    const facilities = await this.facilityRepository.findAllActive();
    return facilities.map((fac) => ({
      id: fac.id,
      code: fac.code,
      name: fac.name,
      icon: fac.icon,
    }));
  }
}
