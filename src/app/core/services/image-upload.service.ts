import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private storage: AngularFireStorage) { }

  uploadImage(image: File, path: string): Observable<string> {
    const fileRef = this.storage.ref(path);
    const uploadTask = fileRef.put(image);

    return new Observable<string>(observer => {
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            observer.next(url);
            observer.complete();
          }, error => {
            observer.error(error);
          });
        })
      ).subscribe();
    });
  }
}

