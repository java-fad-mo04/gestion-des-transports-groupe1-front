import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-conf-suppr-resa',
  templateUrl: './conf-suppr-resa.component.html',
  styles: []
})
export class ConfSupprResaComponent implements OnInit {

  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
  }

}
