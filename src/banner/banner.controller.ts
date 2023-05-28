import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';

@Controller('/banners')
export class BannerController {
  @Get('/:banner')
  getBanner(
    @Param('banner') banner: string,
    @Query('title') title = 'Hello, world!',
    @Query('subtitle') subtitle = 'Subtitle',
    @Res() res: Response,
  ) {
    // Get template names from views
    const templates = new Set<string>();
    readdirSync(join(__dirname, '../../svg-banners')).forEach((template) => {
      const templateName = template.substring(0, template.lastIndexOf('.'));
      templates.add(templateName);
    });
    // Check if the banner exists in templates
    if (!templates.has(banner))
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: `Banner ${banner} not found` });
    else
      return res
        .contentType('image/svg+xml')
        .render(banner, { title, subtitle });
  }
}
