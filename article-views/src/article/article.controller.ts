import { Controller, Get, Param, Req, Session } from '@nestjs/common';
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
  async view(@Param('id') id: string, @Session() session: any, @Req() req) {
    //console.log(req.ip); // 使用用户的 IP 地址作为唯一标识
    //登录用户通过 session.user.id 标识
    //未登录用户通过 IP 地址标识
    const data = await this.articleService.getViews(+id, session?.user?.id || req?.ip);
    return data
  }
}
