import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Skill } from './schemas/skill.schema';
import { Model } from 'mongoose';

@Injectable()
export class SkillService {
  constructor(@InjectModel(Skill.name) private skillModel: Model<Skill>) {}

  async findByCategory({ category, mode }): Promise<Skill[]> {
    return await this.skillModel
      .find({ category: category })
      .find({ $or: [{ mode: mode }, { mode: 'default' }] })
      .exec();
  }

  async getCategories(): Promise<string[]> {
    return await this.skillModel.find().distinct('category').exec();
  }

  async findById(id: string): Promise<Skill> {
    return await this.skillModel.findById(id).exec();
  }
}
