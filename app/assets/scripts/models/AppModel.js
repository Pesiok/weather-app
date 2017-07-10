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
        this.set('weather', []);
        this.set('info', {});
    }

    getCoords() {
        return fetchCoords()
            .then(coords => parseCoords(coords));
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
            .then(coords => fetchWeatherInfo(coords, weatherKey))
            .then(parseWeatherInfo);
        
    }

    getWikiInfo() {
        const city = this.get('weather').city || this.get('location').address;

        return fetchWikiInfo(city).then(parseWikiInfo);
    }

    
}

export default AppModel;