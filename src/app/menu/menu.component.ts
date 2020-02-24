import { Component, OnInit } from '@angular/core';
import { Collegue } from '../auth/auth.domains';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',

  styles: []
})
export class MenuComponent implements OnInit {

  collegue: Collegue = new Collegue({});

  collegueConnecte: Observable<Collegue>;
  listeRoles: string[];

  constructor(private _authSrv: AuthService) { }

  ngOnInit() {
    this.collegueConnecte = this._authSrv.collegueConnecteObs;
    this.collegueConnecte.subscribe(col => {
      this.listeRoles = col.roles; console.log(col);
    });
    console.log(this.listeRoles);
  }

  // Matt : nouvelle fonction de test si la personne a un role ou pas
  hasRole(role: string): boolean {

    //console.log('this.listeRoles : ' + this.listeRoles + ' role : ' + role);

    if (this.listeRoles.indexOf(role) !== -1) {
      return true;
    }
    return false;
  }

  // Matt : fonction pour mettre en valeur la page où on se trouve dans le menu
  highlight(idm: string){
    //alert('highlight');
    //this.backgroundColor = "red";
    //document.getElementById(idm).style.backgroundColor = 'red';
  }

}


