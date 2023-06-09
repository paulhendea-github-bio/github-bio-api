import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  Param,
} from '@nestjs/common';
import { OpenAiService } from './openai.service';
import { GetSummaryDto } from './dto/GetSummary.dto';

@Controller('/openai')
export class OpenAiController {
  constructor(private readonly openaiService: OpenAiService) {}

  @Get()
  getHello(): string {
    return 'Hello, world!';
  }

  @Post('/summary')
  async getResumeSummary(@Body() data: GetSummaryDto) {
    try {
      return await this.openaiService.getSummary(data);
    } catch (error) {
      if (error.isAxiosError)
        throw new HttpException(
          error.response.statusText,
          error.response.status,
        );
      else throw error;
    }
  }

  @Post('/summary/:style')
  async getCodeStyledResumeSummary(
    @Param('style') style = 'bash',
    @Body() data: GetSummaryDto,
  ) {
    try {
      return await this.openaiService.getCodeStyledSummary({ style, data });
    } catch (error) {
      if (error.isAxiosError)
        throw new HttpException(
          error.response.statusText,
          error.response.status,
        );
      else throw error;
    }
  }
}
