import { Component, OnInit } from '@angular/core';
//import { ReserverComponent } from '../reserver/reserver.component';

@Component({
  selector: 'app-reserver',
  templateUrl: './reserver.component.html',
  styles: []
})

export class ReserverComponent implements OnInit {

  constructor() { }

        ngOnInit() {

        }

}

/*

declare var ol: any;



export class ReserverComponent implements OnInit {




  constructor() { }



      latitude: number = 18.5204;
      longitude: number = 73.8567;

      map: any;

      ngOnInit() {
        this.map = new ol.Map({
          target: 'map',
          layers: [
            new ol.layer.Tile({
              source: new ol.source.OSM()
            })
          ],
          view: new ol.View({
            center: ol.proj.fromLonLat([73.8567, 18.5204]),
            zoom: 8
          })
        });

      }


}

*/
