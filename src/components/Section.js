export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._initialArray = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    //use this._renderer
    // to create the elements for the rendering
    this._initialArray.forEach((item) => {
      this._renderer(item);
    });
  }

  addItems(item) {
    //take the item and render it into this._element
    this._container.append(item);
  }
}
