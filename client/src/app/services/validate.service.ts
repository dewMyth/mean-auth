import { Injectable } from '@angular/core';
import { User } from '../types/User.model';

@Injectable({
  providedIn: 'root',
})
export class ValidateService {
  constructor() {}

  validateRegister(user: User) {
    if (
      user.name == undefined ||
      user.email == undefined ||
      user.username == undefined ||
      user.password == undefined
    ) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email: string) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  // validateUsername(username: string) {
  //   const re = /^[a-z0-9_-]{3,16}$/;
  //   return re.test(username);
  // }
}
