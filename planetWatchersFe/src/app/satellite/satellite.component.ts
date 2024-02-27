import { Component, OnInit } from '@angular/core';
import { SatelliteService } from './satellite.service';




@Component({
  selector: 'app-satellite',
  templateUrl: './satellite.component.html',
  styleUrls: ['./satellite.component.css']
})
export class SatelliteComponent implements OnInit {
  satellite: any;
  satellitesData: any[] = []
  satellitesImages: any[] = []
  satellitesIds: any[] = []
  // showImage = false;
  ids: number[] = []
  constructor(private satelliteService: SatelliteService) {
  }
  imageUrl: any;
  ngOnInit(): void {

    this._getSatellites()

  }

  showImage() {

    this._getSatellites()
    for (let data of this.satellitesData) {
      this.satellitesImages.push(data['imageStringified'])
      this.satellitesIds.push(data['ind'])
    }

  }

  private _getSatellites() {
    this.satelliteService.getSatellites().subscribe((satellites: any[]) => {
      this.satellitesData = satellites

    });

  }
  onNewState(state: any) {
    let { id, satellites } = state

    this.satellitesData[id].image = satellites[id].image

  }

}
