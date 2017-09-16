import {View} from '../utilities/MVC.js';

'use strict';

class ErrorView extends View {
    constructor(model, controller) {
        super(model, controller);

        this.setRoot(document.querySelector('.error'));
        this._elements = {
            errorInfo: this.getRoot().querySelector('.error__info'),
            button: this.getRoot().querySelector('.error__button'),
            body: document.getElementsByTagName('html')[0]
        }

        this.events();
    }

    getEl() {
        return this._elements;
    }

    events() {
        this.getModel().addEventListener('get-all-error', error => this.render(error));
        this.getEl().button.addEventListener('click', () => this.toggleModal());
    }

    toggleModal() {
        this.getRoot().classList.toggle('error--active');
        this.getEl().body.classList.toggle('html--modal-open');

        setTimeout(() => this.getRoot().classList.toggle('error--show'), 300);
    }

    render(error) {
        this.getEl().errorInfo.innerHTML = error;
        this.toggleModal()
    }
}

export default ErrorView;