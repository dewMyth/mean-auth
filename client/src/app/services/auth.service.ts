import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../types/User.model';

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
    return this.http.post('http://localhost:5000/api/user/registe', user, {
      headers: headers,
    });
  }
}
