export interface Iweather {
  id: number;
  city: string;
  forecast: Array<{
    date: string,
    temperatureCelsius: number,
    temperatureFahrenheit: number,
    humidity: number
  }>;
}
