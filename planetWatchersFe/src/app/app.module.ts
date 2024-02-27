import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SatelliteComponent } from './satellite/satellite.component';
import { SingleSatelliteComponent } from './single-satellite/single-satellite.component';

@NgModule({
  declarations: [
    AppComponent,
    SatelliteComponent,
    SingleSatelliteComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
