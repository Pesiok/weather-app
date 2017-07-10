import AppModel from './models/appModel'; 
import SearchFormView from './views/SearchFormView'; 
import WeatherView from './views/WeatherView'; 
import InfoView from './views/InfoView'; 
import SearchFormController from './controllers/SearchFormController';

'use strict'; 

// main model
const appModel = new AppModel();

// controllers
const searchFormController = new SearchFormController(appModel)

// views
const searchFormView = new SearchFormView(appModel, searchFormController);
const weatherView = new WeatherView(appModel);
const infoView = new InfoView(appModel);

// start app on load

// document.addEventListener('DOMContentLoaded', () => {
//     appModel.getCoords()
//         .then(() => appModel.getWeatherInfo())
//         .then(weather => appModel.set('weater', weather))
//         .then(() => getCityInfo(appModel.get('weather').city))
//         .then(location => appModel.set('location', location))
//         .then(() => appModel.getWikiInfo())
//         .then(info => appModel.set('info', info))
//         .then(() => appModel.emitEvent('change-all'))
//         .catch(error => console.log(error));
// });








