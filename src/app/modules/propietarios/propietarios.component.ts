import { Component, OnInit } from '@angular/core';
import { CONSTANTES_PROYECTO } from 'src/app/shared/shared.config';
import { SharedService } from 'src/app/shared/shared.service';

interface propietariosModel {
  id: Int32Array;
  nombre: string;
  telefono: string;
  correo: string;
}

@Component({
  selector: 'app-propietarios',
  templateUrl: './propietarios.component.html',
  styleUrls: ['./propietarios.component.css']
})

export class PropietariosComponent implements OnInit {

  datos:propietariosModel[] = [] //{} as propietariosModel

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    let service = CONSTANTES_PROYECTO.BASE_URL + "/v1/propietario/obtener";

    this.sharedService.get(service).subscribe(
      (data:any) => {
        this.datos = data.propietarios
        console.log(data.propietarios);
      }
    )
  }

  public createInmueble(propietario: propietariosModel) {
    console.log(propietario.id);
    alert('Aquí para crear');
  }

  public deletePropietario(propietario: propietariosModel) {
    console.log(propietario.id);

    let service = CONSTANTES_PROYECTO.BASE_URL + "/v1/propietario/eliminar";
    let body = { 
      "id": propietario.id
    }

    this.sharedService.post(service, body).subscribe(
      (data:any) => {
        alert(data.Mensaje);
        this.ngOnInit();
      }
    );

  }

}
