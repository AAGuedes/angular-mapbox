import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';


@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {

  @Input()
  public lngLat?: [number, number];

  @ViewChild('map')
  public divMap?: ElementRef;

  public zoom: number = 13;
  public map?: Map;

  ngAfterViewInit(): void {
    if(!this.lngLat) throw "No se han recibido coordenadas";
    if(!this.divMap) throw 'Elemento HTML no encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat,
      zoom: this.zoom,
      interactive: false,
    });

    new Marker()
      .setLngLat(this.lngLat)
      .addTo(this.map);
  }

}
