import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class EmojisRequest {
  @IsOptional()
  @IsInt()
  @Transform((param) => parseInt(param.value))
  limit?: number = 10;

  @IsOptional()
  @IsInt()
  @Transform((param) => parseInt(param.value))
  page?: number = 1;
}
