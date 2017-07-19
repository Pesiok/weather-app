// import polyfills
import "babel-polyfill";
import 'whatwg-fetch'

// import modules
import AppModel from './models/appModel'; 
import SearchFormView from './views/SearchFormView'; 
import WeatherView from './views/WeatherView'; 
import InfoView from './views/InfoView';
import MapView from './views/MapView'; 
import ErrorView from './views/ErrorView'; 
import SearchFormController from './controllers/SearchFormController';
import WeatherController from './controllers/WeatherController';
import MapController from './controllers/MapController';

'use strict'; 

// app model
const appModel = new AppModel();

// controllers
const searchFormController = new SearchFormController(appModel);
const weatherController = new WeatherController(appModel);
const mapController = new MapController(appModel);

// views
const searchFormView = new SearchFormView(appModel, searchFormController);
const weatherView = new WeatherView(appModel, weatherController);
const mapView = new MapView(appModel, mapController);
const infoView = new InfoView(appModel);
const errorView = new ErrorView(appModel);

// initialize app
document.addEventListener('DOMContentLoaded', () => appModel.init());










