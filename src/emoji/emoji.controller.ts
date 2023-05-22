import { Controller, Get, Param, Query } from '@nestjs/common';
import { EmojiService } from './emoji.service';
import { EmojisDto } from './dto';
import { Emoji } from './schemas/emoji.schema';

@Controller('/emojis')
export class EmojiController {
  constructor(private readonly emojiService: EmojiService) {}

  @Get()
  async getEmojis(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<EmojisDto> {
    const data = await this.emojiService.findAll({ page, limit });
    return { data, limit, page };
  }

  @Get('/:id')
  getEmojiById(@Param('id') id: string): Promise<Emoji> {
    return this.emojiService.findById(id);
  }
}
