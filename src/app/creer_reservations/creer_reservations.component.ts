import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/Reservation';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-creer_reservations',
  templateUrl: './creer_reservations.component.html',
  styles: []
})

// GET /reservationsCovoiturage?idCol=

// filterAnnoncesCovoiturage

// - Filtrer les annonces de covoiturage
// POST /reservationsCovoiturage
// body
// {
	// "depart"="",
	// "detination"="",
	// "date"="
// }


export class CreerReservationsComponent implements OnInit {

  nouvelleResaCovoiturage: Reservation = new Reservation();

  listeCovoiturage: Observable<Reservation[]>;

  constructor(private _dataService: DataService) { }


  ngOnInit() {
  }


  creerResaCovoiturage() {
   this.listeCovoiturage = this._dataService.filterAnnoncesCovoiturage(this.nouvelleResaCovoiturage);
  }
}
