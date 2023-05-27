import { Skill } from '../schemas/skill.schema';

export class SkillsResponse {
  data: Skill[];
  limit: number;
  page: number;
}
