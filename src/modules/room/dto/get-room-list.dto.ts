import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  Min,
  Max,
  IsUUID,
  IsNumber,
} from 'class-validator';

export class GetRoomListDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 12;

  @IsOptional()
  @IsString()
  province?: string;

  @IsOptional()
  @IsString()
  district?: string;

  @IsOptional()
  @IsString()
  ward?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number;

  @IsOptional()
  @IsUUID()
  roomTypeId?: string;

  @IsOptional()
  @IsUUID()
  toiletTypeId?: string;

  @IsOptional()
  @IsUUID()
  parkingTypeId?: string;

  @IsOptional()
  @IsUUID()
  gateLockTypeId?: string;

  @IsOptional()
  @IsUUID()
  curfewTypeId?: string;

  @IsOptional()
  @IsUUID()
  dryingAreaTypeId?: string;

  @IsOptional()
  @IsString()
  facilityIds?: string;

  @IsOptional()
  @IsString()
  sort?: string;
}
