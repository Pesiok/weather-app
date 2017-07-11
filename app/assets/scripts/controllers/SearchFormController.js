import {Controller} from '../utilities/MVC.js';

'use strict';

class SearchFormController extends Controller {
    constructor(model, view) {
        super(model, view);
    }

    _getAllInfoFromValue(value) {
        const model =  this.getModel()

        model.getCityInfo(value)
            .then(location => {
                model.set('location', location);
                model.set('coords', location.coords);
            })
            .then(() => model.getWeatherInfo())
            .then(weather => model.set('weather', weather))
            .then(() => model.getWikiInfo(model.get('location').name))
            .then(info => model.set('info', info))
            .then(() => model.emitEvent('change-all'))
            .catch(error => console.log(error));
    }

    onSubmit(event) {
        const value = event.target.children.searchCity.value;
        event.preventDefault();
        this._getAllInfoFromValue(value);
    }
}

export default SearchFormController;