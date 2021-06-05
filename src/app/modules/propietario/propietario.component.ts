import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-propietario',
  templateUrl: './propietario.component.html',
  styleUrls: ['./propietario.component.css']
})
export class PropietarioComponent implements OnInit {

  enviado:boolean = false;
  form:FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({nombre: ["", Validators.required], telefono: ["", Validators.required]})
  }

  get campos() {
    return this.form.controls;
  }

  enviar() {
    this.enviado = true;
    if (this.form.valid) {
      console.log("Guardar aquí ", this.form.value)
    } else {
      console.log("No guardar ")
    }
  }

  ngOnInit(): void {


  }

}
