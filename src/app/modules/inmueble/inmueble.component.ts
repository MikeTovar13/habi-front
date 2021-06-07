import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CONSTANTES_PROYECTO } from 'src/app/shared/shared.config';
import { SharedService } from 'src/app/shared/shared.service';

interface selectModel {
  id: Int32Array;
  nombre: string;
}


@Component({
  selector: 'app-inmueble',
  templateUrl: './inmueble.component.html',
  styleUrls: ['./inmueble.component.css']
})
export class InmuebleComponent implements OnInit {

  enviado: boolean = false;
  form: FormGroup;
  ciudades: selectModel[] = []
  localidades: any = {} as selectModel[]
  id_propietario = 0;
  control: FormArray;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private sharedService: SharedService, private _route: Router) {
    this.form = this.formBuilder.group(
      {
        inmuebles: this.formBuilder.array([])
      }
    )
    this.control = <FormArray>this.form.controls.inmuebles
    this.control.push(this.newInmueble(0))
    console.log(this.form)
  }

  private newInmueble(i: number) {
    this.localidades["localidad" + i] = [] as selectModel[]
    return this.formBuilder.group({
      area: ["", Validators.required],
      habitaciones: ["", Validators.required],
      precio: ["", Validators.required],
      direccion: ["", Validators.required],
      id_ciudad: ["", Validators.required],
      id_localidad: ["", Validators.required],
    })

  }
  public adicionarInmueble(){
    this.control.push(this.newInmueble(this.control.length))
  }

  get campos() {
    return this.form.controls.inmuebles as FormArray;
  }

  errores(i: number) {
    return this.campos.controls[i] as FormGroup
  }

  localidad(i:number){
    return this.localidades["localidad"+i]
  }
  trackByFn(index: any, item: any) {
    return index;
 }

  public enviar() {
    console.log(this.form)
    this.enviado = true;
    if (this.form.valid) {
      (document.querySelector('#message_error') as HTMLElement).style.display = 'none';
      console.log(this.form.value)
      let body = this.form.value
      body["id_propietario"] = this.id_propietario
      let service = CONSTANTES_PROYECTO.BASE_URL + "/v1/inmueble/crear";
      console.log(body)
      this.sharedService.post(service, body).subscribe(
        (data: any) => {
          alert(data.Mensaje);
          this._route.navigate(['/inmuebles'])
        }
      )
    } else {
      (document.querySelector('#message_error') as HTMLElement).style.display = 'block';
      console.log(this.form.errors);
    }
  }

  private getCiudades() {
    let service = CONSTANTES_PROYECTO.BASE_URL + "/v1/utils/ciudades";

    this.sharedService.get(service).subscribe(
      (data: any) => {
        this.ciudades = data.ciudades
        console.log(data.ciudades);
      }
    )
  }

  public getLocalidades(i: number) {
    let service = CONSTANTES_PROYECTO.BASE_URL + "/v1/utils/localidades?id=" + this.errores(i).value.id_ciudad;


    this.sharedService.get(service).subscribe(
      (data: any) => {
        this.localidades["localidad"+i] = data.localidades
        console.log(data.localidades);
      }
    )
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id_propietario = params["id_propietario"];
      console.log(this.id_propietario);
    })

    this.getCiudades();


  }




}
