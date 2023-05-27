import {
  Controller,
  Get,
  Param,
  Query,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { EmojiService } from './emoji.service';
import { EmojisResponse } from './dto';
import { Emoji } from './schemas/emoji.schema';
import { MongooseError } from 'mongoose';

@Controller('/emojis')
export class EmojiController {
  constructor(private readonly emojiService: EmojiService) {}

  @Get()
  async getEmojis(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ): Promise<EmojisResponse> {
    const data = await this.emojiService.findAll({ page, limit });
    return { data, limit, page };
  }

  @Get('/:id')
  async getEmojiById(@Param('id') id: string): Promise<Emoji> {
    try {
      const emoji = await this.emojiService.findById(id);
      if (emoji === null)
        throw new HttpException(
          `No Emoji found for id ${id}`,
          HttpStatus.NOT_FOUND,
        );
      return emoji;
    } catch (error) {
      if (error instanceof MongooseError)
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      else throw error;
    }
  }
}
