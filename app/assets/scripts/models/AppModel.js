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
import config from '../config/config.json';
import {Model} from '../utilities/MVC.js';

'use strict';

class AppModel extends Model {
    constructor() {
        super();
        this._settings = config;
        this.set('location', {});
        this.set('coords', []);
        this.set('weather', {});
        this.set('info', {});
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
        const system = this.getSettings().system;
        
        return parseCoords(coords)
            .then(parsedCoords => fetchWeatherInfo(parsedCoords, weatherKey))
            .then(weatherInfo => parseWeatherInfo(weatherInfo, system));
        
    }

    getWikiInfo(city) {
        return fetchWikiInfo(city).then(parseWikiInfo);
    }

    changeSystem(system) {
        const weatherInfo = this.get('weather');
        const weatherKey = this.getSettings().weatherKey;
        const coords = this.get('coords');

        this._settings.system = system;
        localStorage.setItem('app-system', system);

        return fetchWeatherInfo(coords, weatherKey)
            .then(weatherInfo => parseWeatherInfo(weatherInfo, system));
    }

}

export default AppModel;