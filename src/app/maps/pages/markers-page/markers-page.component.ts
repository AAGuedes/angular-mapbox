import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

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
  public markers: MarkerAndColor[] = [];

  ngAfterViewInit(): void {

    if(!this.divMap) throw 'Elemento HTML no encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.currentLngLat,
      zoom: this.zoom,
    });

    this.readFromLocalStorage();
  }

  createMarker(): void {
    if(!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string): void {
    if(!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push({
      color: color,
      marker: marker,
    });

    this.saveToLocalStorage();
  }

  deleteMarker(index: number): void {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  flyTo(marker: Marker): void {
    if(!this.map) return;

    this.map.flyTo({
      zoom: this.zoom,
      center: marker.getLngLat(),
    });
  }

  saveToLocalStorage(): void {
    const plainMarker: PlainMarker[] = this.markers.map((colorMarker) => {
      return {
        color: colorMarker.color,
        lngLat: colorMarker.marker.getLngLat().toArray(),
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarker));
  }


  readFromLocalStorage(): void {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] =  JSON.parse(plainMarkersString);

    plainMarkers.forEach((marker) => {
      const [lng, lat] = marker.lngLat;
      const coords = new LngLat(lng, lat);

      this.addMarker(coords, marker.color);
    });
  }
}
