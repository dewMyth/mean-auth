import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/types/User.model';

import { FlashMessagesService } from 'flash-messages-angular';
import { ValidateService } from 'src/app/services/validate.service';
import { AuthService } from 'src/app/services/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onRegisterSubmit(): any {
    const user: User = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
    };

    if (!this.validateService.validateRegister(user)) {
      this.flashMessagesService.show('Please fill in all fields', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    }

    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessagesService.show('Please use a valid email', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(
      (data) => {
        console.log(data);
        if (data) {
          this.flashMessagesService.show(
            'You are now registered and can log in',
            {
              cssClass: 'alert-success',
              timeout: 3000,
            }
          );
          this.router.navigate(['/login']);
        }
      },
      (err) => {
        console.log(err);
        this.flashMessagesService.show(
          'Network Error! Please try again or Contact Administration',
          {
            cssClass: 'alert-danger',
            timeout: 3000,
          }
        );
      }
    );
  }
}
