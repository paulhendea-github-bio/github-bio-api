import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmojiDocument = HydratedDocument<Emoji>;

@Schema()
export class Emoji {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  category: string;

  @Prop()
  url?: string;
}

export const EmojiSchema = SchemaFactory.createForClass(Emoji);
