import PopUp from './PopUp.js';

class PopUpWithForm extends PopUp {
    constructor ({ popUpSelector, handleFormSubmit}) {
        super();
        this._handleFormSubmit = handleFormSubmit;
    }
}

// in index.js, 
// const newCardPopUp = new PopUpWithForm('#add-card-modal'), () => {};