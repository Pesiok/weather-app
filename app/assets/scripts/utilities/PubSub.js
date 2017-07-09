'use strict';

class PubSub {
    constructor() {
        this._eventHandlers = {};
    }

    subscribe(event, handler) {
        if (!this._eventHandlers[event]) {
            this._eventHandlers[event] = [];
        }

        this._eventHandlers[event].push(handler);
    }

    publish(event, args) {
        if (!this._eventHandlers[event] || this._eventHandlers[event].length < 0) {
            return;
        } 

        this._eventHandlers[event].forEach(handler => {
                handler(args);
        });
    }
}

export default PubSub;