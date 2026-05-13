import { Controller, Get, Query } from '@nestjs/common';
import { MasterOptionService } from '../services/master-option.service';
import {
  GetMasterOptionDto,
  GetGroupedMasterOptionsDto,
} from '../dto/get-master-option.dto';

@Controller('master-options')
export class MasterOptionController {
  constructor(private readonly masterOptionService: MasterOptionService) {}

  @Get()
  async getByCategory(@Query() query: GetMasterOptionDto) {
    return this.masterOptionService.getByCategory(query.category);
  }

  @Get('grouped')
  async getGrouped(@Query() query: GetGroupedMasterOptionsDto) {
    return this.masterOptionService.getGroupedByCategories(query.categories);
  }
}
