import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { TechComponent } from './tech/tech.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { AuthComponent } from './auth/auth.component';
import {FormsModule} from "@angular/forms";
import {StatutConnecteService} from "./auth/statut-connecte.service";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import { MenuComponent } from './menu/menu.component';
import {ReservationsComponent } from './reservations/reservations.component';
import {AnnoncesComponent} from './annonces/annonces.component';
import {StatistiquesComponent} from './statistiques/statistiques.component';
import { from } from 'rxjs';
import { VehiculesComponent } from './vehicules/vehicules.component';
import { PlanningComponent } from './planning/planning.component';
import { OccupationComponent } from './occupation/occupation.component';
import { ModalComponent } from './modal/modal.component';

const routes: Routes = [
  { path: 'tech', component: TechComponent, canActivate:[StatutConnecteService]}, // /tech accessible uniquement si connecté
  { path: 'auth', component: AuthComponent},
  { path: 'collaborateur', component: MenuComponent},
  { path: 'collaborateur/reservations', component: ReservationsComponent},
  { path: 'collaborateur/annonces', component: AnnoncesComponent},
  { path: 'collaborateur/statistiques', component: StatistiquesComponent},
  { path: '', redirectTo: '/auth', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    TechComponent,
    AuthComponent,
    MenuComponent,
    ReservationsComponent,
    AnnoncesComponent,
    StatistiquesComponent,
    VehiculesComponent,
    PlanningComponent,
    OccupationComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    MDBBootstrapModulesPro.forRoot(),
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
    MDBSpinningPreloader
  }],
  bootstrap: [AppComponent],
  entryComponents: [ ModalComponent ]
})
export class AppModule { }
