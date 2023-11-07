import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { ImageUploadService } from '@services/image-upload.service';
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
    public imageUploadService: ImageUploadService,
  ) {}

  isSignUp = false;
  selectedImage: File | null = null;

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
  ) {
    if (!this.isSignUp) {
      this.isSignUp = true;
      this.onUpload(userName, userEmail, (photoURL: any) => {
        setTimeout(() => {
          this.authService.signUp(
            userEmail,
            userPassword,
            userName,
            userRole,
            photoURL,
          );
          this.isSignUp = false;
        }, 500);
      });
      
    }
  }

  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  onUpload(userName: string, userEmail: string, callback: any) {
    if (this.selectedImage) {
      let fileName = `${userName}_${userEmail}`;
      if (fileName) {
        const filePath = `images/${fileName.toLowerCase()}`;
        const uploadObservable = this.imageUploadService.uploadImage(
          this.selectedImage,
          filePath,
        );

        let imageUrl: string = '';
        uploadObservable.subscribe(
          (url) => {
            imageUrl = url;
            callback(imageUrl);
          },
          (error) => {
            console.error('Error al cargar la imagen:', error);
          },
        );
      }
    } else {
      callback('');
    }
  }
}
