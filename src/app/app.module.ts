import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { ReservationsComponent } from './reservations/reservations.component';
import { AnnoncesComponent } from './annonces/annonces.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { from } from 'rxjs';
import { VehiculesComponent } from './vehicules/vehicules.component';
import { PlanningComponent } from './planning/planning.component';
import { OccupationComponent } from './occupation/occupation.component';
import { ChauffeursComponent } from './chauffeurs/chauffeurs.component';

const routes: Routes = [
  { path: 'tech', component: TechComponent, canActivate: [StatutConnecteService] }, // /tech accessible uniquement si connecté
  { path: 'connexion', component: AuthComponent },
  { path: 'collaborateur/reservations', component: ReservationsComponent },
  { path: 'collaborateur/annonces', component: AnnoncesComponent },
  { path: 'collaborateur/statistiques', component: StatistiquesComponent },
  { path: 'admin/chauffeurs', component: ChauffeursComponent },
  { path: 'admin/vehicules', component: VehiculesComponent },
  { path: 'chauffeur/occupation', component: OccupationComponent },
  { path: 'chauffeur/planning', component: PlanningComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' }
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
    ChauffeursComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
