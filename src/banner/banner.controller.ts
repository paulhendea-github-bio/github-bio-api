import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('/banners')
export class BannerController {
  @Get('/:banner')
  async getBanner(
    @Param('banner') banner: string,
    @Query('title') title = 'Hello, world!',
    @Query('subtitle') subtitle = 'Subtitle',
    @Query('transparent') transparent: boolean,
    @Res() res: Response,
  ) {
    const template = await import(`./templates/${banner}`).catch(() => {
      throw new HttpException(
        `Cannot find a template for '${banner}'`,
        HttpStatus.BAD_REQUEST,
      );
    });
    return res
      .setHeader('Content-Type', 'image/svg+xml')
      .send(template.default({ title, transparent, subtitle }));
  }
}
