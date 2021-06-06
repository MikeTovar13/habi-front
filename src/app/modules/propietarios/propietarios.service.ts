import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropietariosService {

  constructor(private http: HttpClient) { }

  get() {
    
    return this.http.get("http://localhost:8080/v1/propietario/obtener")
    
  }
}
