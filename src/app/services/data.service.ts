import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../models/Reservation';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

const url = environment.baseUrl;


@Injectable({
  providedIn: 'root'
})
export class DataService {
  reservationHistorique = new Subject<Reservation>();

  constructor(private _httpClient: HttpClient) { }

  listerAnnoncesCovoiturage(idCol: number): Observable<Reservation[]> {
    return this._httpClient.get<Reservation[]>(`${url}reservationsCovoiturage?idCol=${idCol}`);
  }


  listerReservationsCCovoiturage(idPass: number): Observable<Reservation[]> {
    return this._httpClient.get<Reservation[]>(`${url}reservationsCovoiturage?idPass=${idPass}`);
  }

  filterAnnoncesCovoiturage(filtreResa: Reservation): Observable<Reservation[]> {
    return this._httpClient.post<Reservation[]>(`${url}reservationsCovoiturage`, filtreResa);
  }

  ajouterPassager(idCol: number, idResa: number): Observable<void> {
    return this._httpClient.patch<void>(`${url}reservationsCovoiturage/${idCol}?idResa=${idResa}`, null);
  }

  creerAnnonceCovoiturage(idCol: number, nouvelleResa: Reservation): Observable<void> {
    return this._httpClient.post<void>(`${url}reservationsCovoiturage?idCol=${idCol}`, nouvelleResa);
  }

  listerReservationsVehicule(idCol: number): Observable<Reservation[]> {
    return this._httpClient.get<Reservation[]>(`${url}reservationsSociete?idCol=${idCol}`);
  }

  creerReservationVehicule(nouvelleResa: Reservation): Observable<void> {
    return this._httpClient.post<void>(`${url}reservationsSociete`, nouvelleResa);
  }

  listerAllAnoncesCovoiturage(): Observable<Reservation[]> {
    return this._httpClient.get<Reservation[]>(`${url}reservationsCovoiturage`);
  }
}
