export default class Section {
  constructor({ initialArray, renderer }, container) {
    this._initialArray = initialArray;
    this._renderer = renderer;
    this._container = container;
  }

  renderItems() {
    //use this._renderer
    // to create the elements for the rendering
    this._initialArray.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item) {
    //take the item and render it into this._element
    this._container.prepend(item);
    console.log("this is the container of addItem");
    console.log(this._container);
  }
}
