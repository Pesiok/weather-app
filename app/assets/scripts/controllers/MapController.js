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
            .catch(error => model.emitEvent('get-all-cancel', error));
    }

    onCoordsChange() {
        const mapObj = this.getModel().get('map');
        const [lat, lng] = this.getModel().get('coords')
        const latLng = new google.maps.LatLng(lat, lng);

        mapObj.marker.setPosition(latLng);
        mapObj.map.setCenter(latLng);
    }

    onDbClick(event) {
        const model = this.getModel();
        const coords = [event.latLng.lat(), event.latLng.lng()];
   
        model.set('coords', coords);
        model.emitEvent('change-coords');
        this._getAllInfo();
    }

    onResize() {
        const map = this.getModel().get('map').map;
        google.maps.event.trigger(map, 'resize');

        map.setCenter(map.getCenter());
    }

}

export default MapController;