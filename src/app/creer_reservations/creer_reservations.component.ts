import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/Reservation';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Collegue } from '../models/Collegue';

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
  listeCovoiturage: Observable<Reservation[]>;

  constructor(private _dataService: DataService, private autth: AuthService) { }

  ngOnInit() {
    this.autth.collegueConnecteObs.subscribe(c => this.collegue = c);

  }

  ajouterPassagerCovoiturage(idResa: number) {
    this._dataService.ajouterPassager(this.collegue.id, idResa).subscribe();
  }

  filtre() {

    this.listeCovoiturage = null;

    if (this.depart != "" || this.depart != "" || this.date != null) {
      this.listeCovoiturage = this._dataService.listerAllAnoncesCovoiturage();
    }

    if (this.depart != "") {
      this.listeCovoiturage = this.listeCovoiturage.pipe(map(d => d.filter(e => e.depart.startsWith(this.depart))));
    }
    if (this.destination != "") {
      this.listeCovoiturage = this.listeCovoiturage.pipe(map(d => d.filter(e => e.destination.startsWith(this.destination))));
    }
    if (this.date != null) {
      this.listeCovoiturage = this.listeCovoiturage.pipe(map(d => d.filter(e => new Date(e.date).toISOString().split('T')[0] === this.date.toString())));
    }
  }

}
