import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '@models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`,
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: user.role || 'default',
    };

    this.userData = user;

    return userRef.set(userData, {
      merge: true,
    });
  }

  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result: { user: any }) => {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['/dashboard']);
            console.log(result.user);
          }
        });
      })
      .catch((error: { message: any }) => {
        window.alert(error.message);
      });
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/sign-in']);
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user != null;
  }

  get userRole(): string {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user.role || '';
  }

  signUp(email: string, password: string, username: string, role: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;
        if (user) {
          this.setUserData({
            uid: user.uid,
            email: email,
            displayName: username,
            photoURL: '',
            role: role || 'default',
          });
          this.afAuth.authState.subscribe((user) => {
            if (user) {
              this.router.navigate(['/dashboard']);
            }
          });
        } else {
          window.alert('Error: El usuario es nulo.');
        }
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}
