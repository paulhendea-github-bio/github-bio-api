import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class GetSummaryDto {
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsObject({ each: true })
  contact: object;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills: string[];

  @IsOptional()
  @IsString()
  currentOcupation?: string;

  @IsOptional()
  @IsString()
  learning?: string;

  @IsOptional()
  @IsString()
  other: string;
}
