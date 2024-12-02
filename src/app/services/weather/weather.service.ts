import { Iweather } from './../../models/iweather';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  cities: Iweather[] = {} as Iweather[];

  private temperatureUnitSource = new BehaviorSubject<boolean>(true);
  temperatureUnitObs = this.temperatureUnitSource.asObservable();

  constructor(private http: HttpClient) {}

  GetAll(): Observable<Iweather[]> {
    return this.http.get<Iweather[]>(environment.url + '/forecast');
  }

  GetCityById(cityId: number): Observable<Iweather> {
    return this.http.get<Iweather>(environment.url + '/cityForecast/' + cityId);
  }

  changeTempUnit(isCelsius: boolean) {
    this.temperatureUnitSource.next(isCelsius);
  }
}
