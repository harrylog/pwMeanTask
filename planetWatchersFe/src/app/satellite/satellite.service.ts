import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import axios from 'axios';
import { catchError, Observable, tap, throwError } from 'rxjs';

const username = 'hrylog'

const password = "harry8planetW"

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SatelliteService {
  satsImgs: any[] = []

  constructor(private http: HttpClient) { }
  apiURLSatellites = environment.apiUrl + 'Satellites';

  getSatellites(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURLSatellites,)
      .pipe(
        tap((imgs) => { this.satsImgs = imgs }),
        catchError(this.handleErr))

  }

  brightenSatImg(brightId): Observable<any[]> {




    return this.http.get<any[]>(this.apiURLSatellites + `/${brightId}`)
      .pipe(

        catchError(this.handleErr))

  }


  private handleErr(err: HttpErrorResponse) {

    if (err.error instanceof ErrorEvent) {
      //client side err
      console.warn('client', err.message)

    } else {
      //server side err
      console.warn('server', err.status)

    }
    return throwError(() => { new Error(err.message) })
  }


}



