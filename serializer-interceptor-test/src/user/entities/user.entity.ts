import { Exclude, Expose, Transform } from "class-transformer";

export class User {
  id: number;
  name: string;
  @Transform(value => `邮箱是：${value}`)
  email: string;
  @Exclude()
  password: string;
  @Expose()
  get xxx(): string {
    return `${this.name} ${this.email}`
  }
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
