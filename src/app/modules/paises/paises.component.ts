import { Component, OnInit } from '@angular/core';
import { CONSTANTES_PROYECTO } from 'src/app/shared/shared.config';
import { SharedService } from 'src/app/shared/shared.service';

interface paisesModel {
  id: number;
  name: string;
  capital: string;
  population: string;
  nativeName: string;
  area: object;
  flag: string;
}

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements OnInit {

  paises:paisesModel[] = [] //{} as paisesModel

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    let service = CONSTANTES_PROYECTO.API_PAISES;

    this.sharedService.get(service).subscribe(
      (data:any) => {
        this.paises = data
        console.log(data);
      }
    )
  }

}

