import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-supression',
  templateUrl: './confirmation-supression.component.html',
  styles: []
})
export class ConfirmationSupressionComponent implements OnInit {

  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
  }

}
