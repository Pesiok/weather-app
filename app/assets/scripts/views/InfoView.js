import {View} from '../utilities/MVC.js';

'use strict';

class InfoView extends View {
    constructor(model, controller) {
        super(model, controller);
        this.setRoot(document.getElementById('city'));
        this.events();
    }

    events() {
        this.getModel().addEventListener('change-all', () => this.render());
    }

    render() {
        const info = this.getModel().get('info');
        let title = info.title;
        let link = `<a class="city__link" href="${info.link}">Learn more</a>`
        let details;

        if (info.extract) {
            details = info.extract.split('</p>')[0]
        } else {
            title = 'what city again? '
            details = '<p>Try typing name of the city manually in the search bar or click on some other nearby place on the map. Sometimes given location may be too crowded.</p>';
            link = '';
        }

        this.getRoot().innerHTML = `
            <h2 class="city__title">About ${title}</h2>
            ${details}
            <div class="city__actions">
                ${link}
            </div>
        `
    }
}

export default InfoView;