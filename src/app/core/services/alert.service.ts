import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  showSuccessAlert(title: string, text: string) {
    Swal.fire({
      icon: 'success',
      title: title,
      text: text,
    });
  }

  showErrorAlert(title: string, text: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
      background: '#334155',
      color: '#fff',
      confirmButtonColor: '#1E293B',
      heightAuto: false,
    });
  }

  showWarningAlert(title: string, text: string) {
    return new Promise<{ isConfirmed: boolean }>((resolve) => {
      Swal.fire({
        icon: 'warning',
        title: title,
        text: text,
        background: '#334155',
        color: '#fff',
        confirmButtonColor: '#1E293B',
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        heightAuto: false,
      }).then((result) => {
        resolve(result);
      });
    });
  }
}
