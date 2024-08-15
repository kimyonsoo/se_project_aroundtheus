export default class Card {
    constructor({name, link}, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;

    }

    _setEventListeners() {
        alert('setEventListener run');

        //.card__like-button
        const likeButton = this._cardElement.querySelector(".card__like-button"); 
        console.log(likeButton);

        //.card__delete-button
    }

    getCardView() {
        this._cardElement = document.querySelector(this._cardSelector).content.firstElementChild.cloneNode(true);

        //get the card view
        
        //set event listener
        this._setEventListeners();
        //return the card 

    }
}