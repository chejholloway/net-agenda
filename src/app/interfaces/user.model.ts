import { IUser } from './iuser.interface';

export class User implements IUser {
  id: number;
  fname: string;
  lname: string;
  email: string;

  constructor(
    public accountnumber = '_' +
      Math.random()
        .toString(36)
        .substr(2, 9),
    public picture = '../../assets/images/avatar.png',
    public createddate = Date.now().toString()
  ) {}
}
