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

  ngOnInit(): void {
    this.loaderService.runLoader(2000, () => {
      console.log('Sign up loading...');
    });
  }

  handlePhotoChange(event: Event): void {}
}
