import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '@models/user.model';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public alert: AlertService,
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        const userRef = this.afs.collection('users').doc<User>(user.uid);
        userRef.get().subscribe((doc) => {
          if (doc.exists) {
            this.userData = doc.data() as User;
          }
          localStorage.setItem('user', JSON.stringify(this.userData));
        });
      } else {
        this.userData = null;
        localStorage.setItem('user', 'null');
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
      role: user.role,
    };

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
          }
        });
      })
      .catch((error: { message: any }) => {
        this.alert.showErrorAlert('Error sign in', error.message);
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

          user.updateProfile({
            displayName: username,
            photoURL: '',
          });

          this.afAuth.authState.subscribe((user) => {
            if (user) {
              this.router.navigate(['/dashboard']);
            }
          });
        } else {
          this.alert.showErrorAlert('Error sign up', 'Null user');
        }
      })
      .catch((error) => {
        this.alert.showErrorAlert('Error sign up', error.message);
      });
  }

  deleteUser() {
    return this.afAuth.currentUser.then((user) => {
      if (user) {
        return user.delete();
      }
      throw new Error('No se ha encontrado un usuario autenticado.');
    });
  }
}
