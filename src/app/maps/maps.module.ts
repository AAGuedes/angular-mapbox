import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as mapboxgl from 'mapbox-gl';
(mapboxgl as any).accessToken = 'pk.eyJ1IjoiYWdyYW04NSIsImEiOiJjbGk5NDVjZzQwNjVoM2ZwcTJydWJjaWRhIn0.6MVBy-tp3GCBgqTdDpbQcQ';

import { MapsRoutingModule } from './maps-routing.module';

import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomPageComponent } from './pages/zoom-page/zoom-page.component';

import { CounterAloneComponent } from '../alone/components/counter-alone/counter-alone.component';
import { SideMenuComponent } from '../alone/side-menu/side-menu.component';


@NgModule({
  declarations: [
    FullScreenPageComponent,
    MapsLayoutComponent,
    MarkersPageComponent,
    MiniMapComponent,
    PropertiesPageComponent,
    ZoomPageComponent
  ],
  imports: [
    CommonModule,
    CounterAloneComponent,
    MapsRoutingModule,
    SideMenuComponent,
  ]
})
export class MapsModule { }
