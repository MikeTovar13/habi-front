import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { ChuckComponent } from './modules/chuck/chuck.component';
import { from } from 'rxjs';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { PropietarioComponent } from './modules/propietario/propietario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PropietariosComponent } from './modules/propietarios/propietarios.component';
import { InmueblesComponent } from './modules/inmuebles/inmuebles.component';
import { InmuebleComponent } from './modules/inmueble/inmueble.component';
import { InicioComponent } from './modules/inicio/inicio.component';
import { PaisesComponent } from './modules/paises/paises.component';

const routes: Routes = [
  {path: "", component: InicioComponent}, 
  {path: "propietarios", component: PropietariosComponent}, 
  {path: "propietario/crear", component: PropietarioComponent}, 
  {path: "inmuebles", component: InmueblesComponent},
  {path: "inmueble/crear/:id_propietario", component: InmuebleComponent}, 
  {path: "paises", component: PaisesComponent} 
  //{path: "chuck", component: ChuckComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    ChuckComponent,
    PropietarioComponent,
    PropietariosComponent,
    InmueblesComponent,
    InmuebleComponent,
    InicioComponent,
    PaisesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    RouterModule
  ]
})
export class AppModule { }
