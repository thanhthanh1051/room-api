import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetMasterOptionDto {
  @IsNotEmpty()
  @IsString()
  category: string;
}

export class GetGroupedMasterOptionsDto {
  @IsNotEmpty()
  @IsString()
  categories: string;
}
