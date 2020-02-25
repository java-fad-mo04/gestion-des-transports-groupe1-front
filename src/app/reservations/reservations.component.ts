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

@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Annuler une réservation</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Etes-vous sûr de vouloir annuler cette réservation ?</strong></p>
    <p>
    <span class="text-danger">Cette réservation sera définitivement annulée !</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Annuler</button>
    <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Confirmer</button>
  </div>
  `
})
export class NgbdModalConfirm {
  constructor(public modal: NgbActiveModal) {}
}



const MODALS = {
  focusFirst: NgbdModalConfirm
};

@Component({
  selector: 'ngbd-modal-focus',
  templateUrl: './modal-focus.html'
})
export class NgbdModalFocus {
  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
      (click)="modal.close('Ok click')">Ok</button>`;

  constructor(private _modalService: NgbModal) {}

  open(name: string) {
    this._modalService.open(MODALS[name]);
  }
}


@Component({
  selector: 'ngbd-accordion-static',
  templateUrl: 'accordion-static.html'
})
export class NgbdAccordionStatic {
}
