import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  selector: 'app-zoom-page',
  templateUrl: './zoom-page.component.html',
  styleUrls: ['./zoom-page.component.css']
})
export class ZoomPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map')
  public divMap?: ElementRef;

  public zoom: number = 10;
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

    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners() {
    if(!this.map) throw 'Mapa no inicializado';

    this.map.on('zoom', (event) => {
      this.zoom =  this.map!.getZoom();
    });

    this.map!.on('zoomend',(event) => {
      if(this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);
    })

    this.map.on('move', (event) => {
      this.currentLngLat = this.map!.getCenter();
    })
  }

  zoomIn() {
    if(!this.map) throw 'Mapa no inicializado';

    this.map.zoomIn();
  }

  zoomOut() {
    if(!this.map) throw 'Mapa no inicializado';

    this.map.zoomOut();
  }

  zoomChanged(value: string) {
    if(!this.map) throw 'Mapa no inicializado';

    this.zoom = Number(value);
    this.map!.zoomTo(this.zoom);
  }

}
