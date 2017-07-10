import {Controller} from '../utilities/MVC.js';

'use strict';

class SearchFormController extends Controller {
    constructor(model) {
        super(model);
    }

    onSubmit(event) {
        const value = event.target.children.searchCity.value;

        event.preventDefault();

        const model =  this.getModel()

        model.getCityInfo(value)
            .then(location => model.set('location', location))
            .then(() => model.getWeatherInfo())
            .then(weather => model.set('weather', weather))
            .then(() => model.getWikiInfo())
            .then(info => model.set('info', info))
            .then(() => model.emitEvent('change-all'))
            .catch(error => console.log(error));

    }
}

export default SearchFormController;