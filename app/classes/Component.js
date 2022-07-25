import EventEmitter from 'events';

import each from 'lodash/each';

export default class Component extends EventEmitter {
  constructor({ element, elements }) {
    super();

    this.selector = element;
    this.selectorChildren = { ...elements };

    this.create();

    this.addEventListeners();
  }

  create() {
    this.element = document.querySelector(this.selector);
    this.elements = {};

    each(this.selectorChildren, (selector, key) => {
      if (
        selector instanceof HTMLElement ||
        selector instanceof window.NodeList ||
        Array.isArray(selector)
      ) {
        this.elements[key] = selector;
      } else {
        this.elements[key] = document.querySelectorAll(selector);

        if (this.elements[key].length === 0) {
          this.elements[key] = null;
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(selector);
        }
      }
    });
  }

  addEventListeners() {}

  removeEventListeners() {}
}
