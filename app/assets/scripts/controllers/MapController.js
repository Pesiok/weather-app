import {Controller} from '../utilities/MVC.js';

'use strict';

class MapController extends Controller {
    constructor(model, view) {
        super(model, view);
    }

    _getAllInfo() {
        const model = this.getModel();
        let weatherCity;
        let locationCity;

        model.emitEvent('get-all');

        model.getWeatherInfo(model.get('coords'))
            .then(weather => {
                model.set('weather', weather);
                weatherCity = weather.city;
            })
            .then(() => model.getCityInfo(weatherCity))
            .then(location => {
                model.set('location', location);
                locationCity = location.name;
            })
            .then(() => model.getWikiInfo(weatherCity))
            .then(info => model.set('info', info))
            .then(() => model.emitEvent('change-all'))
            .catch(error => console.log(error));
    }

    onCoordsChange() {
        const map = this.getModel().get('map');
        const [lat, lng] = this.getModel().get('coords')
        const latLng = new google.maps.LatLng(lat, lng);

        map.marker.setPosition(latLng);
        map.map.setCenter(latLng);

        this._getAllInfo();
    }

    onDbClick(event) {
        const model = this.getModel();
        const coords = [event.latLng.lat(), event.latLng.lng()];
   
        model.set('coords', coords);
         console.log(model.get('coords'));
        model.emitEvent('change-coords');

        
    }

}

export default MapController;