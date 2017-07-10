import {View} from '../utilities/MVC.js';

'use strict';

class SearchFormView extends View {
    constructor(model, controller) {
        super(model, controller);
        this.setRoot(document.getElementById('searchForm'));
        this.events();
    }

    events() {
        this.getRoot().addEventListener('submit', event => this.getController().onSubmit(event));
    }


}

export default SearchFormView;