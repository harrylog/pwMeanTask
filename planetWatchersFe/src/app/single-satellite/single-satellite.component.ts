import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SatelliteService } from '../satellite/satellite.service';

@Component({
  selector: 'app-single-satellite',
  templateUrl: './single-satellite.component.html',
  styleUrls: ['./single-satellite.component.css']
})
export class SingleSatelliteComponent implements OnInit {


  @Input() satImg!: any
  @Input() id!: number
  @Output() newState = new EventEmitter<any>();
  constructor(private satelliteService: SatelliteService) {
  }
  // imgStr: any = "https://services.sentinel-hub.com/ogc/wms/26fc2e12-219a-42eb-9dde-f9f0287a7823?showLogo=false&service=WMS&request=GetMap&layers=1_TRUE_COLOR&styles=&format=image%2Fjpeg&transparent=false&version=1.1.1&name=sentinel2&height=400&width=400&maxcc=29.576944329543906&priority=mostRecent&gain=1&gamma=1&ATMFILTER=&time=2017-03-28%2F2023-01-14&srs=EPSG%3A3857&evalsource=S2L2A&PREVIEW=3&bbox=3784609,3887476,3804177,3907044"
  ngOnInit(): void {

  }
  increaseBrightness10Per(id) {
    this.satelliteService.brightenSatImg(id).subscribe((satellites: any[]) => {
      this.newState.emit({ id, satellites })
    });
  }
}
