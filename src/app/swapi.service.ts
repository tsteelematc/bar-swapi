import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { pipe, EMPTY, merge, race } from 'rxjs';
import { repeat, tap, expand, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  constructor(private http: HttpClient) { }

  fetchPlanets() {

    // return this.http.get("https://swapi.dev/api/planets/").pipe(
    //   tap(x => console.log(x)),
    //   map(x => (x as any).results.map(y => ({ name: y.name }))),
    //   //repeat(3),
    //   tap(x => console.log(x)),
    // );

    //return merge(
    // return race(
    //   this.http.get("https://swapi.dev/api/planets/")
    //   , this.http.get("https://swapi.dev/api/planets/?page=2")
    // ).pipe(
    //   map(x => (x as any).results.map(y => ({ name: y.name })))
    // );

    return this.http.get("https://swapi.dev/api/planets/")
      .pipe(
        tap(x => console.log(x))
        //, repeat(5)
        
        , expand(x => (x as any).next ? this.http.get((x as any).next) : EMPTY )
        //, race()
        , map(x => (x as any).results.map(y => ({ name: y.name })))
        , tap(x => console.log(x))
      )
    ;
  }
}
