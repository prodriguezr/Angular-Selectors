import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, switchMap, tap } from 'rxjs/operators';

import { CountriesService } from '../../services/countries.service';
import { CountrySmall, Country } from '../../interfaces/countries.interface';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {
  myForm:FormGroup = this.formBuilder.group({
    region: [ '', [ Validators.required ] ],
    country: [ '', [ Validators.required ] ],
    border: [ '', [ Validators.required ] ],
  });

  // Fill selectors
  regions:string[] = [];
  countries:CountrySmall[] = [];
  borders:CountrySmall[] = [];

  loading:boolean = false;

  constructor(
    private formBuilder:FormBuilder,
    private countriesService:CountriesService) { }

  ngOnInit(): void {
    this.regions = this.countriesService.regions;

    this.myForm.get('region')?.valueChanges
      .pipe(
        tap( (_) => {
          this.myForm.get('country')?.reset('');
          this.loading = true;
        }),
        switchMap(region => this.countriesService.getCountriesByRegion(region))
      )
      .subscribe(countries => {
        this.countries = countries;
        this.loading = false;
      });

    this.myForm.get('country')?.valueChanges
      .pipe(
        tap((_) => {
          this.myForm.get('border')?.reset('');
          this.loading = true;
        }),
        switchMap(countryCode => this.countriesService.getBordersByCountry(countryCode)),
        switchMap(country => this.countriesService.getCountriesByBorders(country?.borders!))
      )
      .subscribe(countries => {
        this.borders = countries;
        this.loading = false;
    });
  }

  save() {
    console.log(this.myForm.value);
  }

}
