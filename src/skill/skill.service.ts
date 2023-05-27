import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Skill } from './schemas/skill.schema';
import { Model } from 'mongoose';

@Injectable()
export class SkillService {
  constructor(@InjectModel(Skill.name) private skillModel: Model<Skill>) {}

  async findAll({ page, limit }): Promise<Skill[]> {
    return await this.skillModel
      .find()
      .skip(page * limit)
      .limit(limit)
      .exec();
  }

  async findById(id: string): Promise<Skill> {
    return await this.skillModel.findById(id).exec();
  }
}
