export default class Page {
  constructor({ element, elements, id }) {
    this.selector = element;
    this.selectorsChildren = elements;
    this.id = id;
  }

  create() {
    this.element = document.querySelector(this.selector);
    console.log('create', this.id, this.element);
  }
}
