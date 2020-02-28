import { Component, OnInit } from '@angular/core';
import {Collegue} from './auth.domains';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

/**
 * Formulaire d'authentification.
 */
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',

  styles: []
})



export class AuthComponent implements OnInit {


  collegue: Collegue = new Collegue({});
  err: boolean;

  constructor(private _authSrv: AuthService, private _router: Router) { }

  ngOnInit() {
    
    
  }

  connecter() {
    this._authSrv.connecter(this.collegue.email, this.collegue.motDePasse)
      .subscribe(
        // en cas de succès, redirection vers la page /tech
        // col => this._router.navigate(['/tech']),

        // en cas de succès, redirection vers la page /menu-collab
        col => this._router.navigate(['collaborateur/reservations']),


        // en cas d'erreur, affichage d'un message d'erreur
        err => {
          return this.err = true;
        }
      );
  }


  remplissageAuto(rrole: string) {


    if (rrole == 'admin') {
      // le code ci dessous HTMLInputElement modifie le chaps texte mais on ne peut pas valider la connexion
      //(<HTMLInputElement>document.getElementById('defaultForm-email')).value = 'admin@dev.fr';
      // le code ci dessous fonctionne :
      this.collegue.email = 'admin@dev.fr';
        
    }
    else if (rrole == 'chauffeur') {
      this.collegue.email = 'chauffeur@dev.fr';
    }
    else {
      this.collegue.email = 'user@dev.fr';
    }

    this.collegue.motDePasse = 'superpass';


  }



}
