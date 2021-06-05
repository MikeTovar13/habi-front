import { Component, OnInit } from '@angular/core';
import { ChuckService } from './chuck.service';

interface chistesModel {
  value: string;
  url: string;
  id: string;
}

@Component({
  selector: 'app-chuck',
  templateUrl: './chuck.component.html',
  styleUrls: ['./chuck.component.css']
})
export class ChuckComponent implements OnInit {

  jokes:chistesModel = {} as chistesModel

  constructor(private chuckService: ChuckService) { }

  ngOnInit(): void {
    this.chuckService.get().subscribe(
      (data:any) => {
        this.jokes = data
      }
    )
  }

}
