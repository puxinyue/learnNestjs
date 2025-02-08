export default class UserVo {
  id: number;
  name: string;
  email: string;

  constructor(data: Partial<UserVo>) {
    Object.assign(this, data);
  }
}