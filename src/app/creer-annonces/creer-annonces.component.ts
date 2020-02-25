import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/Reservation';
import { ReservationsComponent } from '../reservations/reservations.component';
import { DataService } from '../services/data.service';
import { AuthService } from '../auth/auth.service';
import { Collegue } from '../models/Collegue';
import { AdresseServiceService } from '../services/adresse-service.service';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Adresse } from '../models/adresse';
import { Vehicule } from '../models/Vehicule';


@Component({
  selector: 'app-creer-annonces',
  templateUrl: './creer-annonces.component.html',
  styles: []

})
export class CreerAnnoncesComponent implements OnInit {
  adresse: Adresse;
  searching = false;
  searchFailed = false;
  nouvelleResa: Reservation = new Reservation();
  veh: Vehicule = new Vehicule();
  col: Collegue;

  constructor(private _dataService: DataService, private _authSrv: AuthService, private _adresseService: AdresseServiceService) { }

  ngOnInit() {
    this._authSrv.collegueConnecteObs.subscribe(c => this.col = c);
  }

  creerReservation() {
    this.nouvelleResa.vehicule = this.veh;
    this._dataService.creerAnnonceCovoiturage(this.col.id, this.nouvelleResa).subscribe();
    console.log(this.nouvelleResa);
  }



}
