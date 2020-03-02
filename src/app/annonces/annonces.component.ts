import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../services/data.service';
import { Collegue } from '../models/Collegue';
import { map } from 'rxjs/operators';
import { Reservation } from '../models/Reservation';
import { Observable } from 'rxjs';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationSupressionComponent } from '../modals/confirmation-supression/confirmation-supression.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styles: []
})
export class AnnoncesComponent implements OnInit {
  col: Collegue;
  annoncesCourantes: Observable<Reservation[]>;
  annoncesHisto: Observable<Reservation[]>;
  res: string;

  constructor(private _authSrv: AuthService, private _dataService: DataService, private _modalService: NgbModal) { }

  ngOnInit() {

    this._authSrv.collegueConnecteObs.subscribe(c => this.col = c);
    this.annoncesCourantes = this._dataService.listerAnnoncesCovoiturage(this.col.id).pipe(
      map(an => an.filter( a => new Date(a.date).getTime() >= Date.now() )));

    this.annoncesHisto = this._dataService.listerAnnoncesCovoiturage(this.col.id).pipe(
        map(an => an.filter( a => new Date(a.date).getTime() < Date.now() )));
  }
  open(id: number) {
    const modalRef = this._modalService.open(ConfirmationSupressionComponent).result
    .then(result => {
      if (result === 'Ok') {
        this._dataService.supprimerAnnonce(id).subscribe(() => {
          console.log('success');
          this.annoncesCourantes = this._dataService.listerAnnoncesCovoiturage(this.col.id).pipe(
            map(an => an.filter( a => new Date(a.date).getTime() >= Date.now() )));
        }, (error: HttpErrorResponse ) => {
          console.log('error', error);
        });
      }
    });
  }
}
