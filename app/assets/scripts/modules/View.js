'use strict';

class View {
    constructor(model, elements) {
        this._model = model;
        this._elements = elements;
    
        // initialize DOM events
        this.DOMEvents();
    }

    DOMEvents() {
        window.addEventListener('DOMContentLoaded', () => {
            // this._elements.button.addEventListener('click', () => {
            //     this._model.emit('weather');
            // });

            this._elements.searchForm.addEventListener('submit', event => {
                this._model.emit('city-search', event);
            })

        })
    }

    updateWeather() {
        const weather = this._model.weather;
        // this._elements.weatherContainer.innerHTML = JSON.stringify(weather);
        console.log(weather);
    }
}

export default View;