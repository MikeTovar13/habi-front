import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CONSTANTES_PROYECTO } from 'src/app/shared/shared.config';
import { SharedService } from 'src/app/shared/shared.service';
import Swal from 'sweetalert2';


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
    this.control.push(this.newInmueble(0)) // Formulario inicial
    console.log(this.form)
  }


  /**
   * Crear nuevo campo para inmueble
   * @param i Posicion inicial para crear siguiente formulario
   * @returns Form apra inmueble nuevo
   */
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

  /**
   * Accion de boton para crear nuevo html de formulario
   */
  public adicionarInmueble() {
    this.control.push(this.newInmueble(this.control.length))
  }

  /**
   * Validacion de campos de formulario
   */
  get campos() {
    return this.form.controls.inmuebles as FormArray;
  }

  /**
   * Validacion de campos de form
   * @param i Formulario al cual verificar los campos
   * @returns 
   */
  public errores(i: number) {
    return this.campos.controls[i] as FormGroup
  }

  /**
   * Cargar localidades para formulario 
   * @param i Formulario al cual se cargaran las localidades
   * @returns 
   */
  public localidad(i: number) {
    return this.localidades["localidad" + i]
  }

  public trackByFn(index: any, item: any) {
    return index;
  }


  /**
   * Envio de peticion al back-end para crear inmueble
   */
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
          Swal.fire(
            'Creado',
            data.Mensaje,
            'success'
          )
          this._route.navigate(['/inmuebles'])
        }
      )
    } else {
      (document.querySelector('#message_error') as HTMLElement).style.display = 'block';
      console.log(this.form.errors);
    }
  }


  /**
   * Obtener ciudades del back-end
   */
  private getCiudades() {

    let service = CONSTANTES_PROYECTO.BASE_URL + "/v1/utils/ciudades";

    this.sharedService.get(service).subscribe(
      (data: any) => {
        this.ciudades = data.ciudades
        console.log(data.ciudades);
      }
    )
  }


  /**
   * obtener localidades del back-end
   * @param i id de la ciudad para obtener las localidades
   */
  public getLocalidades(i: number) {

    let service = CONSTANTES_PROYECTO.BASE_URL + "/v1/utils/localidades?id=" + this.errores(i).value.id_ciudad;

    this.sharedService.get(service).subscribe(
      (data: any) => {
        this.localidades["localidad" + i] = data.localidades
        console.log(data.localidades);
      }
    )
  }

  ngOnInit(): void {

    // Get id del propietario
    this.route.params.subscribe(params => {
      this.id_propietario = params["id_propietario"];
      console.log(this.id_propietario);
    })

    // Cargar ciudades iniciales para crear inmueble
    this.getCiudades();


  }




}
