import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmojiDocument = HydratedDocument<Emoji>;

@Schema({ toJSON: { virtuals: true }, id: false })
export class Emoji {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  category: string;
}

export const EmojiSchema = SchemaFactory.createForClass(Emoji);
EmojiSchema.virtual('url').get(function () {
  const { ASSETS_URL } = process.env;
  return ASSETS_URL + this.filename;
});
