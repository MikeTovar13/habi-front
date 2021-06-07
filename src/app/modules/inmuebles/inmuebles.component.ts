import { Component, OnInit } from '@angular/core';
import { CONSTANTES_PROYECTO } from 'src/app/shared/shared.config';
import { SharedService } from 'src/app/shared/shared.service';

interface inmueblesModel {
  id: number;
  area: Float32Array;
  habitaciones: number;
  precio: number;
  direccion: string;
  localidad: string;
  propietario: string;
}

@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styleUrls: ['./inmuebles.component.css']
})

export class InmueblesComponent implements OnInit {

  inmuebles: inmueblesModel[] = []

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {

    let service = CONSTANTES_PROYECTO.BASE_URL + "/v1/inmueble/obtener";
    let body = {
      "pagina": 1,
      "orden": {
        "tipo": "fecha",
        "by": "DESC"
      }
    }

    this.sharedService.post(service, body).subscribe(
      (data: any) => {
        this.inmuebles = data.inmuebles
        console.log(data);
      }
    )
  }

  public deleteInmueble(inmueble: inmueblesModel) {
    console.log(inmueble.id);

    let service = CONSTANTES_PROYECTO.BASE_URL + "/v1/inmueble/eliminar";
    let body = {
      "id": inmueble.id
    }

    this.sharedService.post(service, body).subscribe(
      (data: any) => {
        alert(data.Mensaje);
        this.ngOnInit();
      }
    );

  }

  public orderBy(tipo: string, by: number) {
    var order = "";
    
    if (by === 0) {
      order = "ASC"
    } else if (by === 1) {
      order ="DESC"
    }

    console.log("organizar por ", tipo, "en orden ", order);

  }


}
