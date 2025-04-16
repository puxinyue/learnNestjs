import { Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Article } from './entities/article.entity';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class ArticleService {
  @InjectEntityManager()
  private readonly entityManager: EntityManager;
  @Inject(RedisService)
  private readonly redisService: RedisService;

  async getArticleList(id: number) {
    const articleList = await this.entityManager.findOneBy(Article, {
      id
    });
    return articleList;
  }
  async getViews(id: number, userId: string) {
    const res = await this.redisService.hashGet(`article_${id}`)
    if (res.views == undefined) {
      const data = await this.getArticleList(id)
      data.views++
      await this.entityManager.update(Article, id, {
        views: data.views
      })
      await this.redisService.hashSet(`article_${id}`, {
        ...data,
        views: data.views
      })
      //ttl 10分钟
      await this.redisService.set(`user_${userId}_article_${id}`, 1, 60 * 10)

      return data.views
    } else {
      const flag = await this.redisService.get(`user_${userId}_article_${id}`)
      if (flag) {
        return res.views
      }
      await this.redisService.hashSet(`article_${id}`, {
        ...res,
        views: +res.views + 1
      })
      await this.redisService.set(`user_${userId}_article_${id}`, 1, 60 * 10)
      return +res.views + 1
    }
  }
  async flushRedisToDB() {
    console.log('定时任务执行了');
    const keys = await this.redisService.keys('article_*')
    console.log(keys);
    for (const key of keys) {
      const res = await this.redisService.hashGet(key)
      await this.entityManager.update(Article, {
        id: +key.split('_')[1]
      }, {
        views: +res.views
      })
    }
  }
}
