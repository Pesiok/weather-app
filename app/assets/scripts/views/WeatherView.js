import {View} from '../utilities/MVC.js';
import {getNonASCII} from '../utilities/utilis.js';

'use strict';

class WeatherView extends View {
    constructor(model, controller) {
        super(model, controller);
        this.setRoot(document.getElementById('weather'));

        this._elements = {
            timePlace: this.getRoot().querySelector('.weather-timeplace'),
            description: this.getRoot().querySelector('.weather-description'),
            details: this.getRoot().querySelector('.weather-details'),
            refresh: this.getRoot().querySelector('.weather-actions__refresh'),
            change: this.getRoot().querySelector('.switch'),
            changeCheckbox: this.getRoot().querySelector('.switch__checkbox'),
            changeIndicator: this.getRoot().querySelector('.switch__indicator'),
            loadingIndicator: this.getRoot().querySelector('.loading-indicator')
        }

        this.events();
    }

    getEl() {
        return this._elements;
    }

    events() {
        const model = this.getModel();

        // model events
        model.addEventListener('change-all', () => {
            this.render();
            this.toggleLoadingIndicator();
        });
        model.addEventListener('get-all', () => this.toggleLoadingIndicator());
        model.addEventListener('get-all-error', () => this.toggleLoadingIndicator());
        model.addEventListener('change-weather', () => this.render());
        model.addEventListener('load', () => {
            this.getController().onLoad();
            this.setCheckboxState();
        });
        
        // DOM events
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

    toggleLoadingIndicator() {
        this.getEl().loadingIndicator.classList.toggle('loading-indicator--active');
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
                <img class="weather-description__icon" src="${weather.description.icon}" alt="" aria-hidden="true">
                <strong class="weather-description__temp">${weather.temp[system]}</strong>
            </div>
            <strong class="weather-description__desc">${weather.description.info}</strong>
            `;
           
        this.getEl().details.innerHTML = `
            <thead class="weather-details__thead">
                <tr>
                    <th>Feels like</th>
                    <th>Pressure</th>
                    <th>Humidity</th>
                    <th>Wind</th>
                </tr>
            </thead>
            <tbody class="weather-details__tbody">
                <tr>
                    <td>${weather.feelsLike[system]}</td>
                    <td>${weather.pressure[system]}</td>
                    <td>${weather.humidity}</td>
                    <td>${weather.wind[system]}</td>
                </tr>
            </tbody>`;
    }

}

export default WeatherView;