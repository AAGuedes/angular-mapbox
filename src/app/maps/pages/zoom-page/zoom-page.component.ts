import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
  selector: 'app-zoom-page',
  templateUrl: './zoom-page.component.html',
  styleUrls: ['./zoom-page.component.css']
})
export class ZoomPageComponent implements AfterViewInit {

  @ViewChild('map')
  public divMap?: ElementRef;

  public zoom: number = 10;
  public map?: Map;

  ngAfterViewInit(): void {

    if(!this.divMap) throw 'Elemento HTML no encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40],
      zoom: this.zoom,
    });

    this.mapListeners();
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
