import {View} from '../utilities/MVC.js'; 
// import {Map, Marker} from '../utilities/Maps.js';

'use strict';

class MapView extends View {
    constructor(model, controller) {
        super(model, controller);
        this.setRoot(document.getElementById('map'));

        this.events();
    }

    events() {
        this.getModel().addEventListener('initial-coords', () => this.setUpMap());
        this.getModel().addEventListener('change-coords', () => this.getController().onCoordsChange());
    }

    mapEvents() {
        this.getModel().get('map').map.addListener('dblclick', event => this.getController().onDbClick(event));
    }

    setUpMap() {
        const model = this.getModel();
        const scriptTag = document.createElement('script');
        const apiKey = model.getSettings().mapKey;
        const coords = model.get('coords');

        const initMap = () => {
            const map = new google.maps.Map(this.getRoot(), {
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