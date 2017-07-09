import Model from './modules/Model.js';
import View from './modules/View.js';
import Controller from './modules/Controller.js';

const elements = {
    button: document.getElementById('getWeather'),
    mapContainer: document.getElementById('map'),
    weatherContainer: document.getElementById('weather-con')
}

const model = new Model();
const view = new View(model, elements);
const controller = new Controller(model, view);




