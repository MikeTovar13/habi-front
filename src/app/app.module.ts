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

const routes: Routes = [
  {path: "chuck", component: ChuckComponent},
  {path: "propietario/crear", component: PropietarioComponent} 
]

@NgModule({
  declarations: [
    AppComponent,
    ChuckComponent,
    PropietarioComponent,
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
