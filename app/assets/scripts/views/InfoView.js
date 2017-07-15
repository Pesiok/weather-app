import {View} from '../utilities/MVC.js';

'use strict';

class InfoView extends View {
    constructor(model, controller) {
        super(model, controller);

        this.setRoot(document.getElementById('city'));
        this._elements = {
            content: this.getRoot().querySelector('.city__content'),
            loadingIndicator: this.getRoot().querySelector('.loading-indicator')
        }

        this.events();
    }

    getEl() {
        return this._elements;
    }

    events() {
        this.getModel().addEventListener('change-all', () => {
             this.render();
             this.toggleLoadingIndicator();
        });
        this.getModel().addEventListener('get-all', () => this.toggleLoadingIndicator());
    }

    toggleLoadingIndicator() {
        this.getEl().loadingIndicator.classList.toggle('loading-indicator--active');
    }

    render() {
        const info = this.getModel().get('info');
        let title = info.title;
        let link = `<a class="city__link" href="${info.link}" target="_blank" title="Learn more about ${info.title} on wiki" >Learn more</a>`
        let details;

        if (info.extract) {
            details = info.extract.split('</p>')[0]
        } else {
            title = 'what city again? '
            details = '<p>Try typing name of the city manually in the search bar or click on some other nearby place on the map. Sometimes given location may be too crowded.</p>';
            link = '';
        }

        this.getEl().content.innerHTML = `
            <h2 class="city__title">About ${title}</h2>
            ${details}
            <div class="city__actions">
                ${link}
            </div>
        `
    }
}

export default InfoView;