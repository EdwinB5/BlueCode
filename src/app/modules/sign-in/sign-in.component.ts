import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { LoaderComponentService } from '@services/loader-component.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  constructor (public authService: AuthService, public loaderService: LoaderComponentService) { }

  isLogginIn = false;

  ngOnInit(): void {
    this.loaderService.runLoader(2000, () => {
      console.log('Sign in loaded...');
    });
  }

  onSignIn(userEmail: string, userPassword: string): void {
    if(!this.isLogginIn) {
      this.isLogginIn = true;
      setTimeout(() => {
        this.authService.signIn(userEmail, userPassword);
        this.isLogginIn = false;
      }, 500);
    }
  }
}
