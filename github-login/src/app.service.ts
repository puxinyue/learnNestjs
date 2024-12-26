import { Injectable } from '@nestjs/common';

const users = [{
  name: 'John Doe',
  age: 25,
  email: '',
},
{
  name: 'xinyu',
  age: 25,
  githubId: '47784995',
  email: '',
}
]

@Injectable()
export class AppService {

  findUserByGithubId(githubId: string): any {
    const user = users?.find(user => user.githubId === githubId);
    return user;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
