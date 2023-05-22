import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OpenAiService } from './openai.service';
import { OpenAiController } from './openai.controller';

@Module({
  imports: [HttpModule],
  providers: [OpenAiService],
  controllers: [OpenAiController],
})
export class OpenAiModule {}
