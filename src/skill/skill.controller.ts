import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { Skill } from './schemas/skill.schema';
import { MongooseError } from 'mongoose';
import { SkillsResponse } from './dto';
import { SkillsRequest } from './dto/SkillsRequest.dto';

@Controller('/skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  async getSkills(
    @Query() { limit, page }: SkillsRequest,
  ): Promise<SkillsResponse> {
    const data = await this.skillService.findAll({ page, limit });
    return { data, limit, page };
  }

  @Get('/:id')
  async getSkillById(@Param('id') id: string): Promise<Skill> {
    try {
      const skill = await this.skillService.findById(id);
      if (skill === null)
        throw new HttpException(
          `No Skill found for id ${id}`,
          HttpStatus.NOT_FOUND,
        );
      return skill;
    } catch (error) {
      if (error instanceof MongooseError)
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      else throw error;
    }
  }
}
