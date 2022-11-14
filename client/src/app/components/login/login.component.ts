import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserCredentials } from 'src/app/types/User.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLoginSubmit() {
    const userCredentials: UserCredentials = {
      username: this.username,
      password: this.password,
    };

    // Login user
    this.authService.loginuser(userCredentials).subscribe((data) => {
      const response = data as any;
      if (response.success) {
        this.authService.storeUserData(response.token, response.user);
        this.router.navigate(['/dashboard']);
      } else {
        console.log(response.msg);
      }
    });
  }
}
