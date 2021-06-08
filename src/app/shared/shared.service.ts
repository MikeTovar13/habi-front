import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  /**
   * funcion base para hacer peticiones tipo "GET"
   * @param url url del servicio o API 
   * @returns objeto tipo "data" con la informacion del servicio
   */
  get(url: string) {

    return this.http.get(url);

  }


  /**
   * funcion base para hacer peticiones tipo "POST"
   * @param url url del servicio o API 
   * @param body parametros para la peticion armados en diccionario, tipo object {}
   * @returns objeto tipo "data" con la informacion del servicio
   */
  post(url: string, body: object) {

    return this.http.post(url, body);

  }

  /**
   * funcion base para mostrar modal de confirmacion eliminado
   * @param callback funcion a ejecutar si se acepta la confirmacion
   * @param text texto para mostrar en el modal
   */
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
