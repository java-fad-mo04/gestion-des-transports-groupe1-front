import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AdresseServiceService {

  constructor(private _httpClient: HttpClient) { }

  search(term: string) {
    if (term === '') {
      return of([]);
    }

    return this._httpClient
      .get(`https://api-adresse.data.gouv.fr/search/?q=${term}&type=housenumber&autocomplete=1`).pipe(
        map(response => response[1])
      );
  }

}
