import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable, of } from 'rxjs';
import { CountrySmall, Country } from '../interfaces/countries.interface';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private _baseUrl:string = 'https://restcountries.eu/rest/v2';
  private _regions:string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regions(): string[] {
    return [...this._regions];
  }

  constructor(private httpClient:HttpClient) { }

  getCountriesByRegion(region:string):Observable<CountrySmall[]> {
    const url:string = `${this._baseUrl}/region/${region}?fields=name;alpha3Code`;

    delay(3000);

    return this.httpClient.get<CountrySmall[]>(url);
  }

  getBordersByCountry(countryCode:string):Observable<Country|null> {
    if (!countryCode)
      return of(null);

    const url:string = `${this._baseUrl}/alpha/${countryCode}`;

    return this.httpClient.get<Country>(url);
  }

  getBordersByCountrySmall(countryCode:string):Observable<CountrySmall> {
    if (!countryCode)
      return of();

    const url:string = `${this._baseUrl}/alpha/${countryCode}?fields=name;alpha3Code`;

    return this.httpClient.get<CountrySmall>(url);
  }

  getCountriesByBorders(borders:string[]):Observable<CountrySmall[]> {
    if (!borders)
      return of ([]);

    const requests:Observable<CountrySmall>[] = [];

    borders.forEach(countryCode => {
      const request = this.getBordersByCountrySmall(countryCode);
      requests.push(request);
    });

    return combineLatest(requests);
  }
}
