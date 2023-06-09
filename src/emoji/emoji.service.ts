import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Emoji } from './schemas/emoji.schema';
import { Model } from 'mongoose';

@Injectable()
export class EmojiService {
  constructor(@InjectModel(Emoji.name) private emojiModel: Model<Emoji>) {}

  async findAll({ page, limit }): Promise<Emoji[]> {
    return await this.emojiModel
      .find()
      .skip(page * limit)
      .limit(limit)
      .exec();
  }

  async findById(id: string): Promise<Emoji> {
    return await this.emojiModel.findById(id).exec();
  }
}
