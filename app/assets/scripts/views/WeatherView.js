import {View} from '../utilities/MVC.js';
import {convertTemp, convertSpeed, getNonASCII} from '../utilities/utilis.js';

'use strict';

class WeatherView extends View {
    constructor(model, controller) {
        super(model, controller);
        this.setRoot(document.getElementById('weather'));

        // const containers = [...this.getRoot().querySelectorAll('.weather-info__container')];

        this._elements = {
            timePlace: this.getRoot().querySelector('.weather-timeplace'),
            description: this.getRoot().querySelector('.weather-description'),
            details: this.getRoot().querySelector('.weather-details'),
            refresh: this.getRoot().querySelector('.weather-actions__refresh'),
            change: this.getRoot().querySelector('.switch'),
            changeCheckbox: this.getRoot().querySelector('.switch__checkbox'),
            changeIndicator: this.getRoot().querySelector('.switch__indicator')
        }

        this.events();
    }

    getEl() {
        return this._elements;
    }

    events() {
        this.getModel().addEventListener('change-all', () => this.render());
        this.getModel().addEventListener('change-weather', () => this.render());
        this.getModel().addEventListener('load', () => {
            this.getController().onLoad();
            this.setCheckboxState();
        });
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

        if (model.getSettings().system === 'imperial') {
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
        const system = this.getModel().getSettings().system;
        const weather = this.getModel().get('weather');
        const info = this.getModel().get('info');
        
        this.getEl().timePlace.innerHTML = `
            <h2 class="weather-timeplace__title">${getNonASCII(weather.city, info.title)}</h2>
            <strong class="weather-timeplace__date">Weather on: <time>${weather.time}</time></strong>`;

        this.getEl().description.innerHTML = `
            <div class="weather-description__container">
                <img class="weathier-description__icon" src="${weather.description.icon}" alt="" aria-hidden="true">
                <strong class="weather-description__temp">${convertTemp(weather.temp, system)}</strong>
            </div>
            <strong class="weather-description__desc">${weather.description.info}</strong>
            `;
           

        this.getEl().details.innerHTML = `
            <thead class="weather-details__thead">
                <tr>
                    <th>Sunrise</th>
                    <th>Sunset</th>
                    <th>Pressure</th>
                    <th>Humidity</th>
                    <th>Wind</th>
                </tr>
            </thead>
            <tbody class="weather-details__tbody">
                <tr>
                    <td>${weather.sunrise}</td>
                    <td>${weather.sunset}</td>
                    <td>${weather.pressure}</td>
                    <td>${weather.humidity}</td>
                    <td>${convertSpeed(weather.wind, system)}</td>
                </tr>
            </tbody>`;
    }

}

export default WeatherView;