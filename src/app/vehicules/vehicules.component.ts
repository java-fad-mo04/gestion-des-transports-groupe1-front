import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Vehicule } from '../models/Vehicule';
import { FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalDirective } from 'angular-bootstrap-md';

enum Categorie {
  MICRO_URBAINE,
  SUV,
  MINI_CITADINE,
  CITADINE_POLYVALENTE,
  COMPACTE,
  BERLINE_TAILLE_S,
  BERLINE_TAILLE_M,
  BERLINE_TAILLE_L,
  TOUT_TERRAIN,
  PICK_UP
}

@Component({
  selector: 'app-vehicules',
  templateUrl: './vehicules.component.html',
  styles: []
})
export class VehiculesComponent implements OnInit {

  vehiculesSociete: Observable<Vehicule[]>;

  listeMarques = new Set();
  immatriculationSearch = '';
  marqueSearch = '';
  vehiculeSearch = new Vehicule();

  boutonNotif: string;
  messageNotif: string;
  displayModal = 'none';
  nouveauVehicule: Vehicule = new Vehicule();

  listeCategorie: string[] = Object.keys(Categorie).filter(p => isNaN(p as any)).sort((a, b) => a.localeCompare(b));

  @ViewChild('basicModal', { static: true }) basicModal: ModalDirective;

  showAndHideModal() {
    this.basicModal.show();

    setTimeout(() => {
      this.basicModal.hide();
    }, 3000);
  }

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this.vehiculesSociete = this._dataService.listerVehiculesSociete();
    console.log('vehicule ' + this.vehiculesSociete);

    this.vehiculesSociete.subscribe(
      (liste: Vehicule[]) => {
        liste.map((v: Vehicule) => {
            this.listeMarques.add(v.marque);
          });
      }
    );
    console.log(this.listeMarques);
  }

  rechercheImmatriculationMarque(type: string) {
    if (type === 'marque') {
      this.marqueSearch = (<HTMLInputElement>document.getElementById('r_marque')).value;
      (<HTMLInputElement>document.getElementById('r_immatriculation')).value = '';
      this.immatriculationSearch = '';
    } else {
      this.immatriculationSearch = (<HTMLInputElement>document.getElementById('r_immatriculation')).value;
      (<HTMLInputElement>document.getElementById('r_marque')).value = '';
      this.marqueSearch = '';
    }

    this.vehiculeSearch.marque = this.marqueSearch;
    this.vehiculeSearch.immatriculation = this.immatriculationSearch;

    if ( this.marqueSearch !== '' || this.immatriculationSearch !== '') {
      this.vehiculesSociete = this._dataService.filtrerVehiculeSociete(this.vehiculeSearch);
    } else {
      this.vehiculesSociete = this._dataService.listerVehiculesSociete();
    }
  }


  validForm(etatForm: FormControl) {
    console.log(this.nouveauVehicule);
    console.log(JSON.stringify(this.nouveauVehicule));
    this._dataService.creerVehiculeSociete(this.nouveauVehicule).subscribe(() => {
      console.log('success');
      this.displayModal = 'block';
      this.messageNotif = 'Le véhicule a bien été ajouté.';
      this.boutonNotif = 'btn-success';
      this.basicModal.hide();
      etatForm.reset();
    }, (error: HttpErrorResponse ) => {
      console.log('error', error);
      this.displayModal = 'block';
      this.messageNotif = `${error.error}`;
      this.boutonNotif = 'btn-danger';
    });
  }

  onCloseConfirm() {
    this.displayModal = 'none';
  }
}
