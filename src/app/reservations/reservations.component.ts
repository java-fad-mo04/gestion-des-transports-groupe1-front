import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../services/data.service';
import { Reservation } from '../models/Reservation';
import { Collegue } from '../models/Collegue';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styles: []
})

export class ReservationsComponent implements OnInit {
  col: Collegue;


  reservationsCourantes: Observable<Reservation[]>;
  reservationsHisto: Observable<Reservation[]>;



  constructor(private _authSrv: AuthService, private _dataService: DataService) { }

  ngOnInit() {
    this._authSrv.collegueConnecteObs.subscribe(c => this.col = c);

    this.reservationsCourantes = this._dataService.listerReservationsCCovoiturage(this.col.id)
    .pipe(
      map(
        resa => resa.filter( r => new Date(r.date).getTime() >= Date.now() )));

    this.reservationsHisto = this._dataService.listerReservationsCCovoiturage(this.col.id)
    .pipe(
      map(
        resa => resa.filter( r => new Date(r.date).getTime() < Date.now() )));




  }



}
