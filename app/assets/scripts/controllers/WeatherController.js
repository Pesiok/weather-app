import {Controller} from '../utilities/MVC.js';
import {getNonASCII} from '../utilities/utilis.js';

'use strict';

class WeatherController extends Controller {
    constructor(model, view) {
        super(model, view);
    }

    _getAllInfo() {
        const model = this.getModel();
        let weatherCity;
        let locationCity;

        model.emitEvent('get-all');

        model.getCoords()
            .then(coords => {
                if (model.get('coords')) {
                    model.set('coords', coords);
                    model.emitEvent('change-coords');
                } else {
                    model.set('coords', coords);
                    model.emitEvent('initial-coords');
                }
            })
            .then(() => model.getWeatherInfo(model.get('coords')))
            .then(weather => {
                model.set('weather', weather);
                weatherCity = weather.city;
            })
            .then(() => model.getCityInfo(weatherCity))
            .then(location => {
                model.set('location', location);
                locationCity = location.name;
            })
            .then(() => model.getWikiInfo(getNonASCII(weatherCity, locationCity)))
            .then(info => model.set('info', info))
            .then(() => {
                model.emitEvent('change-all');
            })
            .catch(error => model.emitEvent('get-all-error', error));
    }

    onChange(checkBoxState) {
        const model = this.getModel();

        const system = (checkBoxState) ? 'metric' : 'imperial';

        model.setSystem(system);
        model.emitEvent('change-weather');
    }

    onLoad() {
       this._getAllInfo();
    }

    onRefresh() {
        this._getAllInfo();
    }

}

export default WeatherController;