import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from 'openai';
import { GetSummaryDto } from './dto/GetSummary.dto';

@Injectable()
export class OpenAiService {
  private readonly openai: OpenAIApi;

  constructor(private configService: ConfigService) {
    const config = new Configuration({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
    this.openai = new OpenAIApi(config);
  }

  async getSummary(data: GetSummaryDto) {
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
          content: JSON.stringify(data),
        },
      ],
      temperature: 1,
    });

    const summary = completion.data.choices[0]?.message?.content;
    return { success: !!summary, summary };
  }

  async getCodeStyledSummary({
    style,
    data,
  }: {
    style: string;
    data: GetSummaryDto;
  }) {
    const context = [
      {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: `Given the following data in json format, write an interesting code styled for a resume. Use ${style} as the target coding language, if you dont know what coding language that is just use terminal style. Take in count that the resume is for a developer. Return only the code.`,
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: JSON.stringify({
          username: 'thompsonemerson',
          location: 'Fortaleza, CE',
          contact: [],
          skills: [
            'Javascript',
            'PHP',
            'MySQL',
            'MongoDB',
            'PostgreSQL',
            'React',
            'React Native',
            'Angular',
            'GraphQL',
          ],
          currentOcupation:
            'working as a software engineer for Pipoca Digital remotely',
          learning: '',
          other:
            'I am doing the #100DaysOfCode challenge focused on react and typescript',
        }),
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.Assistant,
        content: `\`\`\`js
          import SoftwareDeveloper from 'thompsonemerson'
          
            class Bio extends SoftwareDeveloper {
              name = 'Emerson Thompson'
              title = 'Software Engineer'
              company = 'Pipoca Digital | Remote'
              location = 'Fortaleza, CE'
            }
            
            class Skills extends SoftwareDeveloper {
              languages = ['JavaScript', 'PHP']
              databases = ['MySQL', 'MongoDB', 'PostgreSQL']
              frameworks = ['React', 'React Native', 'Angular', 'GraphQL']
          }
          \`\`\``,
      },
    ];

    const completion = await this.openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        ...context,
        {
          role: ChatCompletionRequestMessageRoleEnum.User,
          content: JSON.stringify(data),
        },
      ],
      temperature: 1,
    });

    const summary = completion.data.choices[0]?.message?.content;
    return { success: !!summary, summary };
  }
}
