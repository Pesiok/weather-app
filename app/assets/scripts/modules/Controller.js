import {weatherAt, getCoords} from '../utilities/weatherAt.js';

'use strict';

class Controller {
    constructor(model, view) {
        this._model = model;
        this._view = view;

        // get local coords and set up a Map
        getCoords().then(coords => {
            this._model.coords = coords;
            this.setUpMap();
        });

        // initialize model events
        this.modelEvents();

        // get weather from geolocation
        this.getWeather();
    }

    modelEvents() {
        this._model.addEventListener('weather', () => this.getWeather());
        this._model.addEventListener('city-search', event => this.parseCoords(event));

    }

    mapEvents() {
        const marker = this._model.appMap.marker;

        marker.addListener('click', () => console.log('clicked!'));
        
    }

    setUpMap(coords = this._model.coords) {
        const scriptTag = document.createElement('script');
        const apiKey = this._model.settings.mapKey;
        const initMap = () => {
            const map = new google.maps.Map(this._view._elements.mapContainer, {
                center: {
                    lat: coords[0], 
                    lng: coords[1]
                },
                zoom: 8
            });
            const marker = new google.maps.Marker({
                position:{
                    lat: coords[0], 
                    lng: coords[1]
                },
                map
            });
            // add map and marker reference to the model
            this._model.appMap = {map, marker};
             // initialize map events
            this.mapEvents();
        }
        // add initMap to global env
        window.initMap = initMap;

        // get map code by jsonp
        scriptTag.setAttribute("src", `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`);
        document.getElementsByTagName('head')[0].appendChild(scriptTag);

    }

    getWeather(coords) {
        if ('geolocation' in navigator) {
            weatherAt(coords).then(weather => {
                this._model.weather = weather;
                this._view.updateWeather();
            });
        } else {
            alert("Your browser doesn't support geolocation!");
        }
    }

    parseCoords(event) {
        event.preventDefault();    
        const value = event.target.children.searchCity.value;
    }

    findCoords(event) {
        // const value = event.target.children.searchCity.value;
        
        // event.preventDefault();
    }
}

export default Controller;