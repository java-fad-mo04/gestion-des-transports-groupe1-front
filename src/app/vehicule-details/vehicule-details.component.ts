import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../services/data.service';
import { Reservation } from '../models/Reservation';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
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
  vehiculeDetails: Vehicule = new Vehicule();

  constructor(private _dataService: DataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      // const idVehicule = params['idVehicule'];
      const immatVehicule = params.get('immatriculation');

      this._dataService.afficherDetailsVehiculesSociete(immatVehicule).subscribe(veh => {
        this.vehiculeDetails = veh;

        this.reservationsCourantes = this._dataService.listerReservationsSocieteParVehicule(this.vehiculeDetails.id)
          .pipe(
            map(
              resa => resa.filter(r => new Date(r.date).getTime() >= Date.now())));

        this.reservationsHisto = this._dataService.listerReservationsSocieteParVehicule(this.vehiculeDetails.id)
          .pipe(
            map(
              resa => resa.filter(r => new Date(r.date).getTime() < Date.now())));
      }
        , (error: HttpErrorResponse) => {
          console.log('error', error);
        });
    });
  }

  validStatut(statut: string) {
    // console.log('statut '+statut);
    console.log(this.vehiculeDetails);
    this.vehiculeDetails.statut = statut;

    this._dataService.editerVehiculeSociete(this.vehiculeDetails, this.vehiculeDetails.id).subscribe(() => {
      console.log('success');
    }, (error: HttpErrorResponse ) => {
      console.log('error', error);
    });

  }
}
