import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  get(url: string) {

    return this.http.get(url);

  }

  post(url: string, body: object) {

    return this.http.post(url, body);

  }

  confirmDelete(callback: Function, text: string) {
    Swal.fire({
      title: '¿Estás seguro de eliminar?',
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    })
  }


}
