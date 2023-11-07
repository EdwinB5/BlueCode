import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '@models/user.model';
import { AlertService } from './alert.service';
import { LoaderComponentService } from './loader-component.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: User | null;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public alert: AlertService,
    public loaderService: LoaderComponentService,
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        const userRef = this.afs.collection('users').doc<User>(user.uid);
        userRef.get().subscribe((doc) => {
          if (doc.exists) {
            this.userData = doc.data() as User;
          }
          localStorage.setItem('user', JSON.stringify(this.userData));
          this.router.navigate(['/dashboard']);
        });
      } else {
        this.userData = null;
        localStorage.setItem('user', 'null');
      }
    });
  }

  private getUserData(): User | null {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user;
  }

  async signIn(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password,
      );
      if (result.user) {
        this.router.navigate(['/dashboard']);
      }
    } catch (error: any) {
      this.alert.showErrorAlert('Error sign in', error.message);
    }
  }

  async signOut() {
    try {
      await this.afAuth.signOut();
      localStorage.removeItem('user');
      this.router.navigate(['/sign-in']);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  get isLoggedIn(): boolean {
    return this.getUserData() !== null;
  }

  get userRole(): string {
    const user = this.getUserData();
    return user ? user.role || '' : '';
  }

  async signUp(
    email: string,
    password: string,
    username: string,
    role: string,
    photoURL: string
  ) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = result.user;
      if (user) {
        await this.setUserData({
          uid: user.uid,
          email: email,
          displayName: username,
          photoURL: photoURL || '',
          role: role || 'default',
        });

        await user.updateProfile({
          displayName: username,
          photoURL: '',
        });

        this.router.navigate(['/dashboard']);
      } else {
        this.alert.showErrorAlert('Error sign up', 'Null user');
      }
    } catch (error: any) {
      this.alert.showErrorAlert('Error sign up', error.message);
    }
  }

  async deleteUser() {
    try {
      const result = await this.alert.showWarningAlert(
        'Confirmation',
        'Are you sure you want to delete your account? This action cannot be undone.',
      );

      if (result.isConfirmed) {
        const user = await this.afAuth.currentUser;

        if (user) {
          const userId = user.uid;
          await this.afs.collection('users').doc(userId).delete();
          user.delete().then(() => {
            this.loaderService.runLoader(500, ()=> {
              this.router.navigate(['/sign-in']);
            })
          });
        } else {
          this.alert.showErrorAlert(
            'Error deleting',
            'No authenticated user found.',
          );
          console.log('No authenticated user found.');
        }
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  private async setUserData(user: any) {
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

    try {
      await userRef.set(userData, { merge: true });
    } catch (error) {
      console.error('Error setting user data:', error);
    }
  }
}
