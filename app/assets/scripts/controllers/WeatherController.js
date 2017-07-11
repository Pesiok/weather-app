import {Controller} from '../utilities/MVC.js';

'use strict';

class WeatherController extends Controller {
    constructor(model, view) {
        super(model, view);
    }

    _getAllInfo() {
        const model = this.getModel();

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