import { Controller, Get } from '@nestjs/common';
import { FacilityService } from '../services/facility.service';

@Controller('facilities')
export class FacilityController {
  constructor(private readonly facilityService: FacilityService) {}

  @Get()
  async getAll() {
    return this.facilityService.getAllActive();
  }
}
