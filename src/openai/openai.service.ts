import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from 'openai';

@Injectable()
export class OpenAiService {
  private openai: OpenAIApi;

  constructor(private configService: ConfigService) {
    const config = new Configuration({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
    this.openai = new OpenAIApi(config);
  }

  async getResumeSummary(prompt) {
    const context = {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content:
        'Given the following data in json format, use it to write a short (3 to 4 sentences) interesting summary for a resume. Use the first person and take in count that the resume is for a developer.',
    };
    const completion = await this.openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        context,
        {
          role: ChatCompletionRequestMessageRoleEnum.User,
          content: JSON.stringify(prompt),
        },
      ],
      temperature: 1,
    });

    return completion.data.choices[0]?.message?.content;
  }
}
