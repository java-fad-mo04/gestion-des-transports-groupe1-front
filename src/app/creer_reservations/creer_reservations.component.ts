import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/Reservation';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Collegue } from '../models/Collegue';
import { Vehicule } from '../models/Vehicule';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { async } from '@angular/core/testing';

@Component({

  selector: 'app-creer_reservations',
  templateUrl: './creer_reservations.component.html',
  styles: []
})


export class CreerReservationsComponent implements OnInit {

  depart: string = '';
  destination: string = '';
  date: Date;
  collegue: Collegue;

  passagers: Collegue[];

  vehiculesSociete: Observable<Vehicule[]>;
  photosVehicules: string[];
  listeCovoiturage: Observable<Reservation[]>;
  covoituragesReserves: Observable<Reservation[]>;
  reservationVehicule: Reservation  = new Reservation();

  resaOk = false;
  err: boolean;
  dejaReserve: boolean;
  dateDepartSociete: Date;
  timeDepart: NgbTimeStruct;
  dateRetourSociete: Date;
  timeRetour: NgbTimeStruct;
  hourStep = 1;
  minuteStep = 10;
  secondStep = 30;
  resaVehicule: Observable<Reservation[]>;
  constructor(private _dataService: DataService, private autth: AuthService) { }




  ngOnInit() {
    this.autth.collegueConnecteObs.subscribe(c => this.collegue = c);
    this.vehiculesSociete = this._dataService.listerVehiculesSociete();
  }

  ajouterPassagerCovoiturage(idResa: number) {
    this._dataService.ajouterPassager(this.collegue.id, idResa).subscribe();
  }

  filtre() {
    this.listeCovoiturage = null;

    if (this.depart != "" || this.depart != "" || this.date != null) {
      this.listeCovoiturage = this._dataService.listerAllAnoncesCovoiturage()
      .pipe(
        map(
          resa => resa.filter(r => new Date(r.date).getTime() >= Date.now())
          .filter(re => re.passagers.every(p => p.id !== this.collegue.id))

            ));
    }

    if (this.depart != "") {
      this.listeCovoiturage = this.listeCovoiturage
      .pipe(map(d => d.filter(e => e.depart.toLowerCase().startsWith(this.depart.toLowerCase()))));
    }
    if (this.destination != "") {
      this.listeCovoiturage = this.listeCovoiturage
      .pipe(map(d => d.filter(e => e.destination.toLowerCase().startsWith(this.destination.toLowerCase()))));
    }
    if (this.date != null) {
      this.listeCovoiturage = this.listeCovoiturage.pipe(
        map(d => d.filter(e => new Date(e.date).toISOString().split('T')[0] === this.date.toString())));
    }
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

  reserverVehicule( vehicule: Vehicule) {


    this.reservationVehicule.vehicule = vehicule;
    this.reservationVehicule.collegue = this.collegue;
    this.reservationVehicule.date = `${this.dateDepartSociete.toString()}T${this.toModel(this.timeDepart)}`;
    this.reservationVehicule.dateRetour = `${this.dateRetourSociete.toString()}T${this.toModel(this.timeRetour)}`;
    this._dataService.creerReservationVehicule(this.reservationVehicule).subscribe(
      () => {},
      () => {}
    );


  }

  listerResaParvehicule(id: number) {
    this.resaVehicule = this._dataService.listerResaParVehicule(id);
    console.log('resa' + this.resaVehicule);
  }

}
