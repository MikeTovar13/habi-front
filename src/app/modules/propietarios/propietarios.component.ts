import { Component, OnInit } from '@angular/core';
import { PropietariosService } from './propietarios.service';

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

  constructor(private propietariosService: PropietariosService) { }

  ngOnInit(): void {
    this.propietariosService.get().subscribe(
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
    alert('Aquí para eliminar');
    this.ngOnInit();
  }

}
