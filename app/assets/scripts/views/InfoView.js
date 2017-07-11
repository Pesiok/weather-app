import {View} from '../utilities/MVC.js';

'use strict';

class InfoView extends View {
    constructor(model, controller) {
        super(model, controller);
        this.setRoot(document.querySelector('.city-info'));
        this.events();
    }

    events() {
        this.getModel().addEventListener('change-all', () => this.render());
    }

    render() {
        const info = this.getModel().get('info');

        this.getRoot().innerHTML = `
            <h2 class="city-info__title">About ${info.title}</h2>
            <p class="city-info__description">${info.extract}</p>
            <a class="button" href="${info.link}">Learn more</a>
        `
    }
}

export default InfoView;