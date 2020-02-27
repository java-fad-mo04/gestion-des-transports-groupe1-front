import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../services/data.service';
import { Reservation } from '../models/Reservation';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Vehicule } from '../models/Vehicule';

@Component({
  selector: 'app-vehicule-details',
  templateUrl: './vehicule-details.component.html',
  styles: []
})
export class VehiculeDetailsComponent implements OnInit {

  reservationsCourantes: Observable<Reservation[]>;
  reservationsHisto: Observable<Reservation[]>;
  vehicule: Observable<Vehicule>;

  constructor(private _dataService: DataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const idVehicule = params['idVehicule'];

      this.vehicule = this._dataService.afficherDetailsVehiculesSociete(idVehicule);

      this.reservationsCourantes = this._dataService.listerReservationsSocieteParVehicule(idVehicule)
        .pipe(
          map(
            resa => resa.filter(r => new Date(r.date).getTime() >= Date.now())));

      this.reservationsHisto = this._dataService.listerReservationsSocieteParVehicule(idVehicule)
        .pipe(
          map(
            resa => resa.filter(r => new Date(r.date).getTime() < Date.now())));

    });
  }
}
