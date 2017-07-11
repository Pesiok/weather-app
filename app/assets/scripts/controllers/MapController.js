import {Controller} from '../utilities/MVC.js';

'use strict';

class MapController extends Controller {
    constructor(model, view) {
        super(model, view);
    }

    _getAllInfo() {
        const model = this.getModel();

        model.getWeatherInfo(model.get('coords'))
            .then(weather => model.set('weather', weather))
            .then(() => model.getCityInfo(model.get('weather').city))
            .then(location => model.set('location', location))
            .then(() => model.getWikiInfo(model.get('location').name))
            .then(info => model.set('info', info))
            .then(() => model.emitEvent('change-all'))
            .catch(error => console.log(error));
    }

    onCoordsChange() {
        const map = this.getModel().get('map');
        const coords = this.getModel().get('coords')
        const latLng = new google.maps.LatLng(coords[0], coords[1]);

        map.marker.setPosition(latLng);
        map.map.setCenter(latLng);
    }

    onDbClick(event) {
        const model = this.getModel();
        const coords = [];
        coords[0] = event.latLng.lat();
        coords[1] = event.latLng.lng();

        model.set('coords', coords);
        model.emitEvent('change-coords');

        this._getAllInfo();
    }

}

export default MapController;