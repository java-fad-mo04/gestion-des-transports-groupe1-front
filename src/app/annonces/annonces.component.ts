import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../services/data.service';
import { Collegue } from '../models/Collegue';
import { map } from 'rxjs/operators';
import { Reservation } from '../models/Reservation';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styles: []
})
export class AnnoncesComponent implements OnInit {
  col: Collegue;
  annoncesCourantes: Observable<Reservation[]>;
  annoncesHisto: Observable<Reservation[]>;

  constructor(private _authSrv: AuthService, private _dataService: DataService) { }

  ngOnInit() {

    this._authSrv.collegueConnecteObs.subscribe(c => this.col = c);
    this.annoncesCourantes = this._dataService.listerAnnoncesCovoiturage(this.col.id).pipe(
      map(an => an.filter( a => new Date(a.date).getTime() >= Date.now() )));

    this.annoncesHisto = this._dataService.listerAnnoncesCovoiturage(this.col.id).pipe(
        map(an => an.filter( a => new Date(a.date).getTime() < Date.now() )));

  }

}
