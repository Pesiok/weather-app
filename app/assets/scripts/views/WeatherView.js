import {View} from '../utilities/MVC.js';

'use strict';

class WeatherView extends View {
    constructor(model, controller) {
        super(model, controller);
        this.setRoot(document.querySelector('.weather-info'));

        const containers = [...this.getRoot().querySelectorAll('.weather-info__container')];

        this._elements = {
            placeAndTime: containers[0],
            weather: containers[1],
            details: this.getRoot().querySelector('.weather-info__details'),
            refresh: this.getRoot().querySelector('.weather-info__refresh'),
            change: this.getRoot().querySelector('.weather-info__switch'),
            changeCheckbox: this.getRoot().querySelector('.weather-info__switch-checkbox'),
            changeIndicator: this.getRoot().querySelector('.weather-info__switch-indicator')
        }

        this.events();
        this.setCheckboxState();

    }

    getEl() {
        return this._elements;
    }

    events() {
        this.getModel().addEventListener('change-all', () => this.render());
        this.getModel().addEventListener('change-weather', () => this.render());
        this.getModel().addEventListener('load', () => this.getController().onLoad());
        this.getEl().refresh.addEventListener('click', () => this.getController().onRefresh());
        this.getEl().change.addEventListener('change', () => {
            const checkboxState = this.toggleCheckbox();
            this.getController().onChange(checkboxState);
        });
    }

    setCheckboxState() {
        const model = this.getModel();
        const checkbox = this.getEl().changeCheckbox;
        const indicator = this.getEl().changeIndicator;

        if (model.getSettings().system !== 'metric') {
            checkbox.checked = false;
            indicator.textContent = 'check_box_outline_blank';
        }
    }

    toggleCheckbox() {
         const indicator = this.getEl().changeIndicator;
         const checkbox = this.getEl().changeCheckbox;

         if (checkbox.checked) {
             indicator.textContent = 'check_box';
         } else {
            indicator.textContent = 'check_box_outline_blank';
         }

         return checkbox.checked;
    }

    render() {
        const location = this.getModel().get('location');
        const weather = this.getModel().get('weather');
        
        this.getEl().placeAndTime.innerHTML = `
            <h2>${location.address}</h2>
            <p>Weather on: ${weather.time}</p>`;

        this.getEl().weather.innerHTML = `
            <img src="${weather.description.icon}" alt="" aria-hidden="true">
            <span>${weather.temp}</span>
            <span>${weather.description.info}</span>`;

        this.getEl().details.innerHTML = `
            <thead>
                <tr>
                    <th>Sunrise</th>
                    <th>Sunset</th>
                    <th>Pressure</th>
                    <th>Humidity</th>
                    <th>Wind</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${weather.sunrise}</td>
                    <td>${weather.sunset}</td>
                    <td>${weather.pressure}</td>
                    <td>${weather.humidity}</td>
                    <td>${weather.wind}</td>
                </tr>
            </tbody>`;
    }

}

export default WeatherView;