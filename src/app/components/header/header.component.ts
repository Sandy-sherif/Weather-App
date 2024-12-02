import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Iweather } from '../../models/iweather';
import { WeatherService } from '../../services/weather/weather.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  cityName: string = '';
  isCelsius: boolean = true;

  constructor(
    protected _WeatherService: WeatherService,
    private router: Router
  ) {}

  toggleUnit() {
    this.isCelsius = !this.isCelsius;
    this._WeatherService.changeTempUnit(this.isCelsius);
  }

  SearchByCity() {
    const city = this._WeatherService.cities.find(
      (city) => city.city.toLowerCase() === this.cityName.toLowerCase()
    );
    if (city) {
      this.router.navigateByUrl('/Cities/' + city.id);
    } else {
      alert('City not found. Please try a different city.');
      this.cityName = '';
    }
  }
}
