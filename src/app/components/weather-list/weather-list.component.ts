import { Iweather } from '../../models/iweather';
import { Component, OnInit } from '@angular/core';
import { WheatherService } from '../../services/weather/weather.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-weather-list',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './weather-list.component.html',
  styleUrl: './weather-list.component.css',
})
export class WeatherListComponent implements OnInit {
  weathers?: Iweather[];

  constructor(private _WheatherService: WheatherService) {}

  ngOnInit() {
    this._WheatherService.GetAll().subscribe({
      next: (data) => {
        console.log(data)
        this.weathers = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
