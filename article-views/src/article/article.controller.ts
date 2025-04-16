import { Controller, Get, Param } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @Get(':id')
  async getArticleList(@Param('id') id: string) {
    const articleList = await this.articleService.getArticleList(+id);
    return articleList;
  }
  @Get(':id/view')
  async view(@Param('id') id: string) {
    const data = await this.articleService.getViews(+id);
    return data
  }
}
