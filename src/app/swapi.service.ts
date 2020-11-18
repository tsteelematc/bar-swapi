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

    // First, whats a pipe?

    // Calling cat, passing results to bar, passing those results to foo...
    //foo(bar(cat()));

    // In F# there is a 'pipe' operator to make this more syntactically pretty...
    // Experimental in JS too...
    //cat |> bar |> foo

    // Or without the pipe symbol, a pipe function can work too...
    // cat.pipe(
    //   bar
    //   , foo
    // );


    // Second, simple pipe of observable to some operations... tap, map, repeat...

    // return this.http.get("https://swapi.dev/api/planets/").pipe(
    //   tap(x => console.log(x)),
    //   map(x => (x as any).results.map(y => ({ name: y.name }))),
    //   //repeat(3),
    //   tap(x => console.log(x)),
    // );


    // Third, naively combine them with merge and race...
    
    //return merge(
    // return race(
    //   this.http.get("https://swapi.dev/api/planets/")
    //   , this.http.get("https://swapi.dev/api/planets/?page=2")
    // ).pipe(
    //   map(x => (x as any).results.map(y => ({ name: y.name })))
    // );

    // Finally, recurse, use the hypermedia REST API ! ! !

    return this.http.get("https://swapi.dev/api/planets/")
      .pipe(
        tap(x => console.log(x))
        , expand(x => (x as any).next ? this.http.get((x as any).next.replaceAll("http:", "https:")) : EMPTY )
        , map(x => (x as any).results.map(y => ({ name: y.name })))
        , tap(x => console.log(x))
      )
    ;
  }
}
