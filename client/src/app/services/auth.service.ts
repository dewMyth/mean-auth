import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, UserCredentials } from '../types/User.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authToken: any;
  user: User;

  constructor(private http: HttpClient) {}

  registerUser(user: User) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:5000/api/user/register', user, {
      headers: headers,
    });
  }

  loginuser(userCredentials: UserCredentials) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      'http://localhost:5000/api/user/login',
      userCredentials,
      {
        headers: headers,
      }
    );
  }

  storeUserData(token: string, user: User) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
}
