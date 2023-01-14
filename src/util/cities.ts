import { ICity } from "../interface/City.interface";

// keeps name "SEED_CITIES" to reflect it being derived from the backend's SEED_CITIES
export const SEED_CITIES: ICity[] = [
    {
        cityName: "Vancouver",
        country: "Canada",
        centerLat: 49.2827,
        centerLong: -123.1207,
        scanRadius: 25,
    },
    {
        cityName: "Calgary",
        country: "Canada",
        centerLat: 51.0447,
        centerLong: -114.0719,
        scanRadius: 25,
    },
    {
        cityName: "Edmonton",
        country: "Canada",
        centerLat: 53.5461,
        centerLong: -113.4937,
        scanRadius: 25,
    },
    {
        cityName: "Winnipeg",
        country: "Canada",
        centerLat: 49.8954,
        centerLong: -97.1385,
        scanRadius: 25,
    },
    {
        cityName: "Toronto",
        country: "Canada",
        centerLat: 43.6532,
        centerLong: -79.3832,
        scanRadius: 25,
    },
    {
        cityName: "Montreal",
        country: "Canada",
        centerLat: 45.5019,
        centerLong: -73.5674,
        scanRadius: 25,
    },
];