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
      this.listeRoles = col.roles;
    });
  }
}
