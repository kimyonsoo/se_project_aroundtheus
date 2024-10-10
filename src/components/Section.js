export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;
  }

  renderItems(initialArray) {
    //use this._renderer
    // to create the elements for the rendering
    initialArray.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item) {
    //take the item and render it into this._element
    this._container.prepend(item);
  }
}
