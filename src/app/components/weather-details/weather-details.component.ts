import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Iweather } from './../../models/iweather';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from '../../services/weather/weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather-details.component.html',
  styleUrl: './weather-details.component.css',
})
export class WeatherDetailsComponent implements OnInit, OnDestroy {
  date: string = '';
  cityId: number = 0;
  isCelsius: boolean = true;
  weatherDetails: Iweather = {} as Iweather;
  filteredDetails: Iweather = {} as Iweather;
  private paramSub: Subscription = new Subscription();

  constructor(
    private _WeatherService: WeatherService,
    private _ActivatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.paramSub = this._ActivatedRoute.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.cityId = +id;
        this.date = '';
        this.GetById();
        this.GetTempUnit();
      }
    });
  }

  GetById() {
    this._WeatherService.GetCityById(this.cityId).subscribe({
      next: (data) => {
        this.weatherDetails = data;
        this.filteredDetails = JSON.parse(JSON.stringify(this.weatherDetails));
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onDateChange() {
    this.filteredDetails.forecast = this.weatherDetails.forecast.filter(
      (forecast) => {
        return forecast.date == this.date;
      }
    );
  }

  GetTempUnit() {
    this._WeatherService.temperatureUnitObs.subscribe({
      next: (unit) => {
        this.isCelsius = unit;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getWeather(temp: number) {
    if (temp >= 20) {
      return 1;
    } else if (temp >= 10 && temp < 20) {
      return 2;
    } else {
      return 3;
    }
  }
  getCircleStyle(humidity: number): string {
    return `conic-gradient(#d76ce7 ${humidity}%, #e9ecef ${humidity}%)`;
  }
  NavigateToCity(id: number) {
    this.router.navigateByUrl('/' + id);
  }
  return() {
    this.router.navigateByUrl('');
  }
  ngOnDestroy() {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
  }
}
