import { Component, OnInit } from '@angular/core';
import { CONSTANTES_PROYECTO } from 'src/app/shared/shared.config';
import { SharedService } from 'src/app/shared/shared.service';
import Swal from 'sweetalert2';

interface inmueblesModel {
  id: number;
  area: Float32Array;
  habitaciones: number;
  precio: number;
  direccion: string;
  localidad: string;
  propietario: string;
  ciudad: string;
}

@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styleUrls: ['./inmuebles.component.css']
})

export class InmueblesComponent implements OnInit {

  inmuebles: inmueblesModel[] = []
  p:number = 1;
  total: number = 0;
  tipo:string = "fecha"
  order:string = "DESC"

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {

    this.getPage(this.p)
  }

  public deleteInmueble(inmueble: inmueblesModel) {
    console.log(inmueble.id);

    this.sharedService.confirmDelete(()=>{
      let service = CONSTANTES_PROYECTO.BASE_URL + "/v1/inmueble/eliminar";
      let body = {
        "id": inmueble.id
      }
  
      this.sharedService.post(service, body).subscribe(
        (data: any) => {
          Swal.fire(
            'Eliminado',
            data.Mensaje,
            'success'
          )
          this.ngOnInit();
        }
      );

    }, "Al eliminar un inmueble no se podrá recuperar la información.")


  }
  getPage(p:number){
    this.p=p
    let service = CONSTANTES_PROYECTO.BASE_URL + "/v1/inmueble/obtener";
    let body = {
      "pagina": this.p,
      "orden": {
        "tipo": this.tipo,
        "by": this.order
      }
    }

    this.sharedService.post(service, body).subscribe(
      (data: any) => {
        this.inmuebles = data.inmuebles
        this.total = data.total
        console.log(data);
      }
    )
  }
  public orderBy(tipo: string, by: number) {
    var order = "";
    
    if (by === 0) {
      order = "ASC"
    } else if (by === 1) {
      order ="DESC"
    }
    this.tipo = tipo
    this.order = order
    this.getPage(this.p)

  }


}
