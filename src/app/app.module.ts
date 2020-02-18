import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { TechComponent } from './tech/tech.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AuthComponent } from './auth/auth.component';
import {FormsModule} from "@angular/forms";
import {StatutConnecteService} from "./auth/statut-connecte.service";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import { MenuCollabComponent } from './menu-collab/menu-collab.component';
import {ResaCollabComponent } from './resa-collab/resa-collab.component';
import {AnnoncesCollabComponent} from './annonces-collab/annonces-collab.component';
import {StatCollabComponent} from './stat-collab/stat-collab.component';
import { from } from 'rxjs';

const routes: Routes = [
  { path: 'tech', component: TechComponent, canActivate:[StatutConnecteService]}, // /tech accessible uniquement si connecté
  { path: 'auth', component: AuthComponent},
  { path: 'collaborateur', component: MenuCollabComponent},
  { path: 'collaborateur/reservations', component: ResaCollabComponent},
  { path: 'collaborateur/annonces', component: AnnoncesCollabComponent},
  { path: 'collaborateur/statistiques', component: StatCollabComponent},
  { path: '', redirectTo: '/auth', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    TechComponent,
    AuthComponent,
    MenuCollabComponent,
    ResaCollabComponent,
    AnnoncesCollabComponent,
    StatCollabComponent
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
