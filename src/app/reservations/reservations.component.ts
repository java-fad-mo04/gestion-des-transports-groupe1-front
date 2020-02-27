import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../services/data.service';
import { Reservation } from '../models/Reservation';
import { Collegue } from '../models/Collegue';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgbActiveModal, NgbModal, NgbAccordion, NgbPanel } from '@ng-bootstrap/ng-bootstrap';
import { ConfSupprResaComponent } from '../modals/conf-suppr-resa/conf-suppr-resa.component';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styles: []
})

export class ReservationsComponent implements OnInit {
  col: Collegue;


  reservationsCourantes: Observable<Reservation[]>;
  reservationsHisto: Observable<Reservation[]>;
  resaVsocieteCourantes: Observable<Reservation[]>;
  resaVsocieteHisto: Observable<Reservation[]>;



  constructor(private _authSrv: AuthService, private _dataService: DataService, private _modalService: NgbModal) { }

  ngOnInit() {
    this._authSrv.collegueConnecteObs.subscribe(c => this.col = c);

    this.reservationsCourantes = this._dataService.listerReservationsCCovoiturage(this.col.id)
      .pipe(
        map(
          resa => resa.filter(r => new Date(r.date).getTime() >= Date.now())));

    this.reservationsHisto = this._dataService.listerReservationsCCovoiturage(this.col.id)
      .pipe(
        map(
          resa => resa.filter(r => new Date(r.date).getTime() < Date.now())));




    this.resaVsocieteCourantes = this._dataService.listerReservationsVehicule(this.col.id)
      .pipe(
        map(
          resa => resa.filter(r => new Date(r.date).getTime() >= Date.now())));

    this.resaVsocieteHisto = this._dataService.listerReservationsVehicule(this.col.id)
      .pipe(
        map(
          resa => resa.filter(r => new Date(r.date).getTime() < Date.now())));


  }
  open(id: number) {
    const modalRef = this._modalService.open(ConfSupprResaComponent).result
      .then(result => {
        if (result === 'Ok') {
          this._dataService.supprimerPassager(this.col.id, id).subscribe();
          this.reservationsCourantes = this._dataService.listerAnnoncesCovoiturage(this.col.id).pipe(
            map(an => an.filter(a => new Date(a.date).getTime() >= Date.now())));
        }
      });
  }

}
