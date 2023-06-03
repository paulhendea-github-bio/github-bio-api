import { IsEnum, IsString } from 'class-validator';

export enum Mode {
  dark = 'dark',
  light = 'light',
}

export class SkillsRequest {
  @IsString()
  category: string;

  @IsEnum(Mode)
  mode: Mode = Mode.dark;
}
