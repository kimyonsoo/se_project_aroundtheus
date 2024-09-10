import PopUp from './PopUp.js';

class PopUpWithImage extends PopUp {
    constructor (popUpSelector) {
        super({popUpSelector});

    }

    open(data) {
        //data = {name, link}
        // add an image to the popup and the corresponding src 
        //this method should be called in your image click handler in index.js
        super();
    }

    //Create one instance of this class in index.js and call its parent’s setEventListeners() method.


}
