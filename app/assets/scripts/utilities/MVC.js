// Originally written by Damian Wielgosik
// Rewritten to ES6 with some changes by Grzegorz Bielski

'use strict';

// observator pattern for model
class Observable {
    constructor() {
        this._events = {};
    }

    addEventListener(eventType, callback) {
        if (!(this._events[eventType])) {
            this._events[eventType] = [];
        }
        this._events[eventType].push(callback);
    }

    emitEvent(eventType, args) {
         if (!this._events[eventType] || this._events[eventType].length < 0) {
            return;
        } 

        this._events[eventType].forEach(handler => {
                handler(args);
        });
    }
}

// contains state of particular component in the application
// implements observator pattern
export class Model extends Observable {
    constructor() {
        super();
        this._properties = {};
    }

    set(key, value) {
        // prevents changing to the same value
        if (this._properties[key] === value) return;

        this._properties[key] = value;
        this.emitEvent('change');
    }

    get(key) {
        return this._properties[key];
    }

}

// associated with only one component
// binds HTML to JS
export class View {
    constructor(model, controller) {
        this._model = model;
        this._controller = controller;
        if (controller) controller.setView(this);
        this._root;
    }

    getModel() {
        return this._model;
    }

    getController() {
        return this._controller;
    }

    getRoot() {
        return this._root;
    }

    setModel(newModel) {
        this._model = newModel;
    }

    setController(newController) {
        this._controller = newController;
    }

    setRoot(element) {
        this._root = element;
    }
}

// can get another view or model to work with
export class Controller {
    constructor(model, view) {
        this._model = model;
        this._view = view;
    }

    getView() {
        return this._view;
    }

    getModel() {
        return this._model;
    }

    setView(newView) {
        this._view = newView;
    }

    setModel(newModel) {
        this._model = newModel;
    }
}



