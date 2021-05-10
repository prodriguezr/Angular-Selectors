export interface CountrySmall {
    name:string;
    alpha3Code:string;
}

export interface Country {
    name:           string;
    topLevelDomain: string[];
    alpha2Code:     string;
    alpha3Code:     string;
    callingCodes:   string[];
    capital:        string;
    altSpellings:   string[];
    region:         Region;
    subregion:      Subregion;
    population:     number;
    latlng:         number[];
    demonym:        string;
    area:           number;
    gini:           number | null;
    timezones:      string[];
    borders:        string[];
    nativeName:     string;
    numericCode:    string;
    currencies:     Currency[];
    languages:      Language[];
    translations:   Translations;
    flag:           string;
    regionalBlocs:  any[];
    cioc:           string;
}

export interface Currency {
    code:   null | string;
    name:   null | string;
    symbol: string;
}

export interface Language {
    iso639_1:   string;
    iso639_2:   string;
    name:       string;
    nativeName: string;
}

export enum Region {
    Oceania = "Oceania",
}

export enum Subregion {
    AustraliaAndNewZealand = "Australia and New Zealand",
    Melanesia = "Melanesia",
    Micronesia = "Micronesia",
    Polynesia = "Polynesia",
}

export interface Translations {
    de: string;
    es: string;
    fr: string;
    ja: string;
    it: string;
    br: string;
    pt: string;
    nl: string;
    hr: string;
    fa: string;
}
