import { Component, OnInit } from '@angular/core';
//import { MDBModalRef } from 'ng-uikit-standard';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: []
})


export class ModalComponent implements OnInit {

  constructor(public modalRef: MDBModalRef) {}

  ngOnInit() {
  }

}
