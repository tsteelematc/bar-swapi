import { Component } from '@angular/core';
import { SwapiService } from '../swapi.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  planets = [];

  constructor(private swapi: SwapiService) {
    this.swapi.fetchPlanets().subscribe(
      x => this.planets = [
        ...this.planets
        , ...x
      ]
        //.filter(x => x.name != "unknown")
        .sort(
          (x, y) => x.name.toUpperCase() > y.name.toUpperCase() ? 1 : -1 
        //(x, y) => x.population > y.population ? -1 : 1 
        )
    );
  }

}
