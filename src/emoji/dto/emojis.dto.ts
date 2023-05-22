import { Emoji } from '../schemas/emoji.schema';

export class EmojisDto {
  data: Emoji[];
  limit: number;
  page: number;
}
