import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserCredentials } from 'src/app/types/User.model';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLoginSubmit() {
    const userCredentials: UserCredentials = {
      username: this.username,
      password: this.password,
    };

    // Login user
    this.authService.loginuser(userCredentials).subscribe(
      (data) => {
        const response = data as any;
        if (response.success) {
          this.authService.storeUserData(response.token, response.user);
          this.router.navigate(['/dashboard']);
        }
      },
      (err) => {
        console.log(err);
        this.flashMessagesService.show(err.error.error, {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
      }
    );
  }
}
