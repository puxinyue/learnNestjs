import { Exclude } from "class-transformer";

export class User {
  id: number;
  name: string;
  email: string;
  @Exclude()
  password: string;
  age: number;
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
