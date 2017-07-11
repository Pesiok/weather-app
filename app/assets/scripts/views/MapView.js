import {View} from '../utilities/MVC.js';

'use strict';

class MapView extends View {
    constructor(model, controller) {
        super(model, controller);
        this.setRoot(document.getElementById('map'));

        this.setUpMap();
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
            // add map and marker reference to the model
            this._model.appMap = {map, marker};
             // initialize events
            this.events();
        }
        // add initMap to global env
        window.initMap = initMap;

        // get map code by jsonp
        scriptTag.setAttribute("src", `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`);
        document.getElementsByTagName('head')[0].appendChild(scriptTag);
    }
    
    events() {
        // this.getModel().addEventListener('change-all', () => this.render());
    }

}

export default MapView;