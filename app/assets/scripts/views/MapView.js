import {View} from '../utilities/MVC.js'; 
import mapStyle from '../config/mapStyle.json';

'use strict';

class MapView extends View {
    constructor(model, controller) {
        super(model, controller);
        this.setRoot(document.getElementById('map'));

        this._elements = {
            map: this.getRoot().querySelector('.section__map')
        }

        this.events();
    }

    getEl() {
        return this._elements;
    }

    events() {
        const model = this.getModel();

        model.addEventListener('initial-coords', () => this.setUpMap());
        model.addEventListener('change-coords', () => this.getController().onCoordsChange());
    }

    mapEvents() {
        const map = this.getModel().get('map').map;

        map.addListener('dblclick', event => this.getController().onDbClick(event));
        google.maps.event.addDomListener(window, 'resize', () => this.getController().onResize());

        this.getModel().addEventListener('change-all', () => this.getController().onResize());
    }

    setUpMap() {
        const model = this.getModel();
        const scriptTag = document.createElement('script');
        const apiKey = model.getSettings().mapKey;
        const coords = model.get('coords');

        const initMap = () => {
            const map = new google.maps.Map(this.getEl().map, {
                center: {
                    lat: coords[0], 
                    lng: coords[1]
                },
                zoom: 6,
                styles: mapStyle
            });
            const marker = new google.maps.Marker({
                position:{
                    lat: coords[0], 
                    lng: coords[1]
                },
                map
            });
            model.set('map', {map, marker});
             // initialize events
            this.mapEvents();
        }
        // add initMap to global env
        window.initMap = initMap;

        // get map code by jsonp
        scriptTag.setAttribute("src", `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`);
        document.getElementsByTagName('head')[0].appendChild(scriptTag);
    }

}

export default MapView;