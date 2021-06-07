import { Component, OnInit } from '@angular/core';
import { CONSTANTES_PROYECTO } from 'src/app/shared/shared.config';
import { SharedService } from 'src/app/shared/shared.service';

interface languagesModel {
  nativeName: string
}

interface currenciesModel {
  code: string;
  name: string;
}

interface paisesModel {
  id: number;
  name: string;
  capital: string;
  currencies: currenciesModel[];
  population: number|string;
  languages: languagesModel[];
  area: number|string;
  flag: string;
}

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements OnInit {

  paises: paisesModel[] = [] //{} as paisesModel

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    let service = CONSTANTES_PROYECTO.API_PAISES;

    this.sharedService.get(service).subscribe(
      (data: any) => {
        this.paises = data;

        this.paises = this.paises.map((valor)=>{
          valor.area= this.changesNumber(<number>valor.area);
          valor.population= this.changesNumber(<number>valor.population);
          return valor
        })

        console.log(data);
      }
    )
  }

  private changesNumber(value: number) {
    if (value)
      return value.toLocaleString("en-US")
    return value
  }

}

