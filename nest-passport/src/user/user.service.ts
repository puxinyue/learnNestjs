import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: '张三',
      password: '123456',
    },
    {
      userId: 2,
      username: '东东东',
      password: 'dong',
    },
  ];

  findOne(username: string) {
    return this.users.find(user => user.username === username);
  }
}
