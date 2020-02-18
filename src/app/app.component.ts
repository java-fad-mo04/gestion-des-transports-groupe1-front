import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs/internal/Observable";
import {Collegue} from "./auth/auth.domains";

/**
 * Composant principal de l'application.
 */
@Component({
  selector: 'app-root',
  template: `
    <div class="jumbotron">
    <div *ngIf="!(collegueConnecte | async).estAnonyme()" align="end">
        <span>{{(collegueConnecte | async).email}}</span>
        <span>({{(collegueConnecte | async).roles}})</span>
        <a  class="btn btn-danger" (click)="seDeconnecter()">Se déconnecter</a>
      </div>
    <img width="500" height="242" src="assets/images/gdt04a.jpg">
      <!-- <h2 class="h1 h1-responsive">GDT - Gestion Des Transports</h2> -->

    </div>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  collegueConnecte:Observable<Collegue>;

  constructor(private _authSrv:AuthService, private _router:Router) {

  }

  /**
   * Action déconnecter collègue.
   */
  seDeconnecter() {
    this._authSrv.seDeconnecter().subscribe(
      value => this._router.navigate(['/auth'])
    );
  }

  /**
   * A l'initialisation, le composant s'abonne au flux du collègue courant connecté.
   *
   * Celui lui permet de rester à jour en fonction des connexions et déconnexions.
   */
  ngOnInit(): void {

    this.collegueConnecte = this._authSrv.collegueConnecteObs;
  }

}
