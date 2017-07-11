import {Controller} from '../utilities/MVC.js';

'use strict';

class WeatherController extends Controller {
    constructor(model, view) {
        super(model, view);
    }

    _getAllInfo() {
        const model = this.getModel();

        model.getCoords()
            .then(coords => model.set('coords', coords))
            .then(() => model.getWeatherInfo(model.get('coords')))
            .then(weather => model.set('weather', weather))
            .then(() => model.getCityInfo(model.get('weather').city))
            .then(location => model.set('location', location))
            .then(() => model.getWikiInfo(model.get('location').name))
            .then(info => model.set('info', info))
            .then(() => model.emitEvent('change-all'))
            .catch(error => console.log(error));
    }

    onChange(checkBoxState) {
        const model = this.getModel();
        let system;

        if (checkBoxState) {
            system = 'metric';
        } else {
            system = 'imperial';
        }

        model.changeSystem(system)
            .then(parsedWeatherInfo => model.set('weather', parsedWeatherInfo))
            .then(() => model.emitEvent('change-weather'))
            .catch(error => console.log(error))
    }

    onLoad() {
       this._getAllInfo();
    }

    onRefresh() {
        this._getAllInfo();
    }

}

export default WeatherController;