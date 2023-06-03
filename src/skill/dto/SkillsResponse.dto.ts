import { Skill } from '../schemas/skill.schema';
import { Mode } from './SkillsRequest.dto';

export class SkillsResponse {
  data: Skill[];
  mode: Mode;
  categories: string[];
}
