import PubSub from '../utilities/PubSub.js';

'use strict';

class Model {
    constructor() {
        this._pubsub = new PubSub();
        this.coords = [];
        this.settings = {
            mapKey: 'AIzaSyCAoZKb18BDrDlKTiNGe_K6NsfRXxE1IqE',
        };
        this.weather = {};

    }

    addEventListener(event, handler) {
        this._pubsub.subscribe(event, handler);
    }

    emit(event, args) {
        this._pubsub.publish(event, args);
    }
}

export default Model;