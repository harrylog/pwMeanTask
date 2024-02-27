import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SatelliteComponent } from './satellite/satellite.component';

const routes: Routes = [
  { path: '', component: SatelliteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
