import { IsEnum } from 'class-validator';

export enum Mode {
  dark = 'dark',
  light = 'light',
}

export class SkillsRequest {
  @IsEnum(Mode)
  mode: Mode = Mode.dark;
}
