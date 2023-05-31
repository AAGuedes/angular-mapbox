import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent {

  @ViewChild('map')
  public divMap?: ElementRef;

  public zoom: number = 13;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-3.70256000000000, 40.41650000000000);

  ngAfterViewInit(): void {

    if(!this.divMap) throw 'Elemento HTML no encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.currentLngLat,
      zoom: this.zoom,
    });

    const marker = new Marker({
      color: '#E74C3C'
    })
      .setLngLat(this.currentLngLat)
      .addTo(this.map);
  }


}
