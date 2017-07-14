import {Controller} from '../utilities/MVC.js';

'use strict';

class SearchFormController extends Controller {
    constructor(model, view) {
        super(model, view);
    }

    _getAllInfoFromValue(value) {
        const model =  this.getModel()
        let cityLocation;

        model.getCityInfo(value)
            .then(location => {
                model.set('location', location);
                cityLocation = location.name

                if (model.get('coords')) {
                    model.set('coords', location.coords);
                    model.emitEvent('change-coords');
                } else {
                    model.set('coords', location.coords);
                    model.emitEvent('initial-coords');
                }
            })
            .then(() => model.getWeatherInfo())
            .then(weather => model.set('weather', weather))
            .then(() => model.getWikiInfo(cityLocation))
            .then(info => model.set('info', info))
            .then(() => {
                console.log(model.get('weather'));
                console.log(model.get('info'));
                console.log(model.get('location'));
                model.emitEvent('change-all');
            })  
            .catch(error => console.log(error));
    }

    onSubmit(event) {
        const value = event.target.children.searchCity.value;
        event.preventDefault();
        this._getAllInfoFromValue(value);
    }
}

export default SearchFormController;