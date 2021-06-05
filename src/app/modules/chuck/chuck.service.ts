import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChuckService {

  constructor(private http: HttpClient) { 

  }

  get() {
    
    return this.http.get("https://api.chucknorris.io/jokes/random")
    
  }

  post() {
    const params = {"parametro": "1"}
    return this.http.post("https://api.chucknorris.io/jokes/random", params )
  }

}
