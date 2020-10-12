import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { AlertData } from '../models/alert-data.model';

/** 
 * Encapsulates the alert logic by providing a plugin-agnostic interface.
*/

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  /** 
   * Shows an alert message.
  */
  show(data: AlertData) {
    Swal.fire({
      text: 'An error has occurred',
      showCloseButton: true,
      icon: data.type,
      ...data
    });
  }
}
