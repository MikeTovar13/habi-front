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

const routes: Routes = [
  {path: "chuck", component: ChuckComponent},
  {path: "propietarios", component: PropietariosComponent} 
]

@NgModule({
  declarations: [
    AppComponent,
    ChuckComponent,
    PropietarioComponent,
    PropietariosComponent,
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
