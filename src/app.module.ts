import { Module } from '@nestjs/common';
import { OpenAiModule } from './openai/openai.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EmojiModule } from './emoji/emoji.module';
import { SkillModule } from './skill/skill.module';

@Module({
  imports: [
    OpenAiModule,
    EmojiModule,
    SkillModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
  ],
})
export class AppModule {}
