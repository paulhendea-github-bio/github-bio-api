import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Emoji } from './schemas/emoji.schema';
import { Model } from 'mongoose';

@Injectable()
export class EmojiService {
  constructor(@InjectModel(Emoji.name) private emojiModel: Model<Emoji>) {}

  async findAll({ page, limit }): Promise<Emoji[]> {
    const emojis = await this.emojiModel
      .find()
      .skip(page * limit)
      .limit(limit)
      .exec();
    return emojis.map((emoji) => {
      emoji.url = process.env.ASSETS_URL + emoji.filename;
      return emoji;
    });
  }

  async findById(id: string): Promise<Emoji> {
    const emoji = await this.emojiModel.findById(id).exec();
    emoji.url = process.env.ASSETS_URL + emoji.filename;
    return emoji;
  }
}
