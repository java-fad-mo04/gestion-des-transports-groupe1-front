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
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';


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
  date: Date;
  time: NgbTimeStruct;
  hourStep = 1;
  minuteStep = 10;
  secondStep = 30;
  messageErreur: string;
  messageOk: string;

  constructor(private _dataService: DataService, private _authSrv: AuthService, private _adresseService: AdresseServiceService) { }

  ngOnInit() {
    this._authSrv.collegueConnecteObs.subscribe(c => this.col = c);
  }
  private pad(i: number): string {
    return i < 10 ? `0${i}` : `${i}`;
  }

  toModel(time: NgbTimeStruct): string {
    if (!time) {
      return null;
    }
    return `${this.pad(time.hour)}:${this.pad(time.minute)}:${this.pad(time.second)}`;
  }

  creerReservation() {

    this.nouvelleResa.vehicule = this.veh;
    this.nouvelleResa.date = `${this.date.toString()}T${this.toModel(this.time)}`;
    this._dataService.creerAnnonceCovoiturage(this.col.id, this.nouvelleResa).subscribe(() => {
      this.messageOk = 'Super !';
    },
    error => {
      this.messageErreur = `Le collègue n'a pu être créé, DSL :-( Veuillez saisir correctement les champs)`
    });

  }



}
