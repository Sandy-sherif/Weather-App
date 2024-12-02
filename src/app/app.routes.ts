import { NotFoundComponent } from './components/not-found/not-found.component';
import { WeatherListComponent } from './components/weather-list/weather-list.component';
import { Routes } from '@angular/router';
import { WeatherDetailsComponent } from './components/weather-details/weather-details.component';

export const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo:'Cities' },
  { path: 'Cities', component: WeatherListComponent },
  { path: 'Cities/:id', component: WeatherDetailsComponent },
  { path: '**', component: NotFoundComponent },
];
