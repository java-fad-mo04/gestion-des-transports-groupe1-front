import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Reservation } from '../models/Reservation';
import { Observable, Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Vehicule } from '../models/Vehicule';

const url = environment.baseUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  responseType: 'text' as 'json'
};

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


  ajouterPassager(idCol: number, idResa: number): Observable<void> {
    return this._httpClient.patch<void>(`${url}reservationsCovoiturage/${idCol}?idResa=${idResa}`, null);
  }

  creerAnnonceCovoiturage(idCol: number, nouvelleResa: Reservation): Observable<void> {
    return this._httpClient.post<void>(`${url}reservationsCovoiturage?idCol=${idCol}`, nouvelleResa, httpOptions);
  }

  listerReservationsVehicule(idCol: number): Observable<Reservation[]> {
    return this._httpClient.get<Reservation[]>(`${url}reservationsSociete?idCol=${idCol}`);
  }

  creerReservationVehicule(nouvelleResa: Reservation): Observable<void> {
    return this._httpClient.post<void>(`${url}reservationsSociete`, JSON.stringify(nouvelleResa), httpOptions);
  }
  supprimerAnnonce(idResa: number): Observable<void> {
    return this._httpClient.delete<void>(`${url}reservationsCovoiturage?idResa=${idResa}`, httpOptions);
  }

  listerAllAnoncesCovoiturage(): Observable<Reservation[]> {
    return this._httpClient.get<Reservation[]>(`${url}reservationsCovoiturage`);
  }

  listerVehiculesSociete(): Observable<Vehicule[]> {
    return this._httpClient.get<Vehicule[]>(`${url}vehiculesSociete`).pipe(
      map(v => v.sort((a: Vehicule, b: Vehicule) =>
        (a.marque.localeCompare(b.marque)))
      ));
  }

  filtrerVehiculeSociete(editVehicule: Vehicule): Observable<Vehicule[]> {
    return this._httpClient.post<Vehicule[]>(`${url}vehiculesSociete`, editVehicule).pipe(
      map(v => v.sort((a: Vehicule, b: Vehicule) =>
        (a.marque.localeCompare(b.marque)))
      ));
  }

  creerVehiculeSociete(nouveauVehicule: Vehicule): Observable<void> {
    return this._httpClient.post<void>(`${url}vehiculesSociete/creer`, JSON.stringify(nouveauVehicule), httpOptions);
  }
  supprimerPassager(idCol: number, idResa: number): Observable<void> {
    return this._httpClient.patch<void>(`${url}reservationsCovoiturage/supprimer/${idCol}?idResa=${idResa}`, null, httpOptions);
  }
  listerResaParVehicule(id: number): Observable<Reservation[]> {
    return this._httpClient.get<Reservation[]>(`${url}vehiculesSociete?idVehicule=${id}`);
  }

  listerReservationsSocieteParVehicule(idVehicule: number): Observable<Reservation[]> {
    return this._httpClient.get<Reservation[]>(`${url}reservationsSociete?idVehicule=${idVehicule}`);
  }

  afficherDetailsVehiculesSociete(immatVeh: string): Observable<Vehicule> {
    return this._httpClient.get<Vehicule>(`${url}vehiculesSociete/afficher/${immatVeh}`);
  }

  editerVehiculeSociete(editerVehicule: Vehicule, idVehicule: number): Observable<void> {
    return this._httpClient.patch<void>(`${url}vehiculesSociete/editer/${idVehicule}`, JSON.stringify(editerVehicule), httpOptions);
  }
}
