import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TechComponent } from './tech/tech.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { StatutConnecteService } from './auth/statut-connecte.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { MenuComponent } from './menu/menu.component';
import { ReservationsComponent } from './reservations/reservations.component'; // Matt : USGDT004 - Collab - liste resa
import { AnnoncesComponent } from './annonces/annonces.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { from } from 'rxjs';
import { VehiculesComponent } from './vehicules/vehicules.component';
import { PlanningComponent } from './planning/planning.component';
import { OccupationComponent } from './occupation/occupation.component';
import { ChauffeursComponent } from './chauffeurs/chauffeurs.component';
import { ReserverComponent } from './reserver/reserver.component'; // Matt : USGDT012 - Admin - Geolocalisation des véhicules (probleme)
import {CreerReservationsComponent} from './creer_reservations/creer_reservations.component';
import { CreerAnnoncesComponent } from './creer-annonces/creer-annonces.component';
import { UrlValidatorDirective } from './validators/url-validator.directive';
import { ConfirmationSupressionComponent } from './modals/confirmation-supression/confirmation-supression.component';
import { ConfSupprResaComponent } from './modals/conf-suppr-resa/conf-suppr-resa.component';
import { VehiculeDetailsComponent } from './vehicule-details/vehicule-details.component'; // Matt : modale de suppression de réservation



const routes: Routes = [
  { path: 'tech', component: TechComponent, canActivate: [StatutConnecteService] }, // /tech accessible uniquement si connecté
  { path: 'connexion', component: AuthComponent },
  // Matt : USGDT004 - Collab - Liste des réservations covoiturage
  { path: 'collaborateur/reservations', component: ReservationsComponent, canActivate: [StatutConnecteService] },
  { path: 'collaborateur/reservations/creer', component: CreerReservationsComponent, canActivate: [StatutConnecteService] },
  { path: 'collaborateur/annonces', component: AnnoncesComponent, canActivate: [StatutConnecteService] },
  { path: 'collaborateur/annonces/creer', component: CreerAnnoncesComponent, canActivate: [StatutConnecteService]},
  { path: 'collaborateur/statistiques', component: StatistiquesComponent, canActivate: [StatutConnecteService] },
  { path: 'admin/chauffeurs', component: ChauffeursComponent, canActivate: [StatutConnecteService] },
  { path: 'admin/vehicules', component: VehiculesComponent, canActivate: [StatutConnecteService] },
  { path: 'admin/vehicules/:idVehicule', component: VehiculeDetailsComponent, canActivate: [StatutConnecteService] },
  // Matt : USGDT012 - Admin - Geolocalisation des véhicules (probleme)
  // { path: 'admin/vehicules/geolocalisation', component: ReserverComponent, canActivate: [StatutConnecteService] },
  { path: 'chauffeur/occupation', component: OccupationComponent, canActivate: [StatutConnecteService] },
  { path: 'chauffeur/planning', component: PlanningComponent, canActivate: [StatutConnecteService] },
  { path: '', redirectTo: '/connexion', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AppComponent,
    TechComponent,
    AuthComponent,
    MenuComponent,
    ReservationsComponent, // Matt : USGDT004
    AnnoncesComponent,
    StatistiquesComponent,
    VehiculesComponent,
    PlanningComponent,
    OccupationComponent,
    ChauffeursComponent,
    ReserverComponent, // Matt : USGDT012 (probleme) // audrey : remettre car probleme build en prod
    CreerAnnoncesComponent,
    UrlValidatorDirective, // Audrey : validation url photo
    ConfirmationSupressionComponent,
    CreerReservationsComponent,
    CreerAnnoncesComponent,
    ConfSupprResaComponent,
    VehiculeDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    NgbModule,
    ],


  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
  }],
  bootstrap: [AppComponent],

  exports: [CreerAnnoncesComponent, ConfirmationSupressionComponent, ConfSupprResaComponent],
  entryComponents: [ConfirmationSupressionComponent, ConfSupprResaComponent]

})
export class AppModule { }
