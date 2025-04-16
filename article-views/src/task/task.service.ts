import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ArticleService } from 'src/article/article.service';

@Injectable()
export class TaskService {

  @Inject(ArticleService)
  private readonly articleService: ArticleService;

  @Cron(CronExpression.EVERY_10_SECONDS) // 每天凌晨0点执行
  async handleCron() {
    this.articleService.flushRedisToDB()
    // 在这里执行你的定时任务逻辑
  }
}
