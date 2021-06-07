import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CONSTANTES_PROYECTO } from 'src/app/shared/shared.config';
import { SharedService } from 'src/app/shared/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-propietario',
  templateUrl: './propietario.component.html',
  styleUrls: ['./propietario.component.css']
})
export class PropietarioComponent implements OnInit {

  enviado: boolean = false;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private sharedService: SharedService, private _route: Router) {
    this.form = this.formBuilder.group(
      {
        nombre: ["", Validators.required],
        telefono: ["", Validators.required],
        correo: ["", [Validators.required, Validators.email]]
      }
    )
  }

  get campos() {
    return this.form.controls;
  }

  public enviar() {
    this.enviado = true;
    if (this.form.valid) {

      (document.querySelector('#message_error') as HTMLElement).style.display = 'none';

      let service = CONSTANTES_PROYECTO.BASE_URL + "/v1/propietario/crear";

      this.sharedService.post(service, this.form.value).subscribe(
        (data: any) => {
          Swal.fire(
            'Creado',
            data.Mensaje,
            'success'
          )
          this._route.navigate(['/propietarios'])
        }
      )
    } else {
      (document.querySelector('#message_error') as HTMLElement).style.display = 'block';
    }
  }

  ngOnInit(): void {
  }


}
