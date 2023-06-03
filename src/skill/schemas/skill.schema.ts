import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SkillDocument = HydratedDocument<Skill>;

@Schema({ toJSON: { virtuals: true }, id: false })
export class Skill {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  mode: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
SkillSchema.virtual('url').get(function () {
  const { ASSETS_URL } = process.env;
  return ASSETS_URL + this.filename;
});
