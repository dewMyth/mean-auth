import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, UserCredentials } from '../types/User.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authToken: any = '';
  user: User;

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {}

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

  loggedIn() {
    // Output (loggedIn value) => expired -> false (not logged in) | not expired -> true (logged in)
    return !this.jwtHelperService.isTokenExpired(this.fetchToken());
  }

  storeUserData(token: string, user: User) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  fetchToken(): string {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    return this.authToken;
  }

  getUser() {
    this.fetchToken();
    return this.http.get('http://localhost:5000/api/user/profile', {
      headers: new HttpHeaders().set('Authorization', this.authToken),
    });
  }

  logout() {
    this.authToken = null;
    this.user = {} as User;
    localStorage.clear();
  }
}
