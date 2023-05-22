import { Controller, Get, Post, Body } from '@nestjs/common';
import { OpenAiService } from './openai.service';

@Controller('/openai')
export class OpenAiController {
  constructor(private readonly openaiService: OpenAiService) {}

  @Get()
  getHello(): string {
    return 'Hello, world!';
  }

  @Post('/summary')
  getResumeSummary(@Body() data) {
    return this.openaiService.getResumeSummary(data);
  }
}
