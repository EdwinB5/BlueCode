import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { LoaderComponentService } from '@services/loader-component.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public loaderService: LoaderComponentService,
  ) {}

  isSignUp = false;

  ngOnInit(): void {
    this.loaderService.runLoader(2000, () => {
      console.log('Sign up loading...');
    });
  }

  onSignUp(
    userEmail: string,
    userPassword: string,
    userName: string,
    userRole: string,
  ): void {
    if (!this.isSignUp) {
      this.isSignUp = true;
      setTimeout(() => {
        this.authService.signUp(userEmail, userPassword, userName, userRole);
        this.isSignUp = false;
      }, 500);
    }
  }

  handlePhotoChange(event: Event): void {}
}
