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
      this.animationIn = gsap.timeline();
      this.animationIn.fromTo(
        this.element,
        { autoAlpha: 0 },
        { autoAlpha: 1, onComplete: resolve }
      );

      this.animationIn.call(() => {
        this.addEventListeners();
        resolve();
      });
    });
  }

  hide() {
    return new Promise((resolve) => {
      this.removeEventListeners();
      this.animationOut = gsap.timeline();

      this.animationOut.to(this.element, { autoAlpha: 0, onComplete: resolve });
    });
  }

  onMouseWheel(e) {
    console.log(e);
  }

  addEventListeners() {
    window.addEventListener('mousewheel', this.onMouseWheel);
  }

  removeEventListeners() {
    window.removeEventListener('mousewheel', this.onMouseWheel);
  }
}
