import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iweather } from '../../models/iweather';

@Injectable({
  providedIn: 'root',
})
export class WheatherService {
  constructor(private http: HttpClient) {}

  GetAll(): Observable<Iweather[]> {
    return this.http.get<Iweather[]>(environment.url);
  }
}
