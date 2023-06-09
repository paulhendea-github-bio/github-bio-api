import { Emoji } from '../schemas/emoji.schema';

export class EmojisResponse {
  data: Emoji[];
  limit: number;
  page: number;
}
