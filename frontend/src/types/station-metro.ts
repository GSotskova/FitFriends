import { LatLngExpression } from 'leaflet';

export enum StationMetro {
  Pionerskaya = 'Пионерская',
  Petrogradskaya = 'Петроградская',
  Udelnaya = 'Удельная',
  Zvyozdnaya = 'Звёздная',
  Sportivnaya = 'Спортивная',
}

export const STATION_METRO = [
  StationMetro.Petrogradskaya,
  StationMetro.Pionerskaya,
  StationMetro.Sportivnaya,
  StationMetro.Udelnaya,
  StationMetro.Zvyozdnaya
];

export type Metro = {
  name: StationMetro;
  location: LatLngExpression;
};

