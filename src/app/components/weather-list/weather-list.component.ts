import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Iweather } from '../../models/iweather';
import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather/weather.service';
import { CommonModule, NgSwitch } from '@angular/common';

@Component({
  selector: 'app-weather-list',
  standalone: true,
  imports: [CommonModule, NgSwitch, FormsModule],
  templateUrl: './weather-list.component.html',
  styleUrl: './weather-list.component.css',
})
export class WeatherListComponent implements OnInit {
  isCelsius: boolean = true;
  weathers?: Iweather[];
  filteredWeathers?: Iweather[];

  constructor(
    private _WeatherService: WeatherService,
    private router: Router
  ) {}

  ngOnInit() {
    this.GetAllCities();
    this.GetTempUnit();
  }

  GetAllCities() {
    this._WeatherService.GetAll().subscribe({
      next: (data) => {
        console.log(data);
        this.weathers = data;
        this.filteredWeathers = data;
        this._WeatherService.cities = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
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
    return `conic-gradient(#8153FF ${humidity}%, #e9ecef ${humidity}%)`;
  }
  NavigateToCity(id: number) {
    this.router.navigateByUrl('/Cities/' + id);
  }
}
