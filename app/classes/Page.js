import gsap from 'gsap';
import each from 'lodash/each';

export default class Page {
  constructor({ element, elements, id }) {
    this.selector = element;
    this.selectorChildren = { ...elements };
    this.id = id;
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

  show() {
    return new Promise((resolve) => {
      gsap.from(this.element, { autoAlpha: 0, onComplete: resolve });
    });
  }

  hide() {
    return new Promise((resolve) => {
      gsap.to(this.element, { autoAlpha: 0, onComplete: resolve });
    });
  }
}
