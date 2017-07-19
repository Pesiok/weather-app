import config from '../config/config.json';
import { Model } from '../utilities/MVC.js';
import {
    fetchCoords, 
    parseCoords,
    fetchCityInfo,
    parseCityInfo,
    fetchWeatherInfo,
    parseWeatherInfo,
    fetchWikiInfo,
    parseWikiInfo
} from '../utilities/utilis.js'

'use strict';

class AppModel extends Model {
    constructor() {
        super();
        this._settings = config;
        this.set('location', null);
        this.set('coords', null);
        this.set('weather', null);
        this.set('info', null);
        this.set('map', null);
    }

    init() {
        // decide on unit system
        if (localStorage.getItem('app-system')) {
            const system = localStorage.getItem('app-system');
            this._settings.system = system;
        } else {
            const defaultSystem = 'metric';
            localStorage.setItem('app-system', defaultSystem);
            this._settings.system = defaultSystem;
        }

        this.emitEvent('load');
    }

    getCoords() {
        return fetchCoords();
    }

    getSettings() {
        return this._settings;
    }

    getCityInfo(value) {
        return fetchCityInfo(value, this.getSettings().geocodeKey).then(parseCityInfo);
    }

    getWeatherInfo(coords = this.get('location').coords) {
        const weatherKey = this.getSettings().weatherKey;
        
        return parseCoords(coords)
            .then(parsedCoords => fetchWeatherInfo(parsedCoords, weatherKey))
            .then(weatherInfo => parseWeatherInfo(weatherInfo));
    }

    getWikiInfo(city) {
        return fetchWikiInfo(city).then(parseWikiInfo);
    }

    setSystem(newSystem) {
        this._settings.system = newSystem;
        localStorage.setItem('app-system', newSystem);
    }
}

export default AppModel;