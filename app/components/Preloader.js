import each from 'lodash/each';
import Component from '../classes/Component';

export default class Preloader extends Component {
  constructor() {
    super({
      element: '.preloader',
      elements: {
        title: '.preloader__text',
        number: '.preloader__number',
        images: document.querySelectorAll('img'),
      },
    });

    this.length = 0;
    console.log(this.element, this.elements);

    this.createLoader();
  }

  createLoader() {
    each(this.elements.images, (element) => {
      const image = new Image();

      image.src = element.getAttribute('data-src');
      image.onload = this.onAssetLoaded();
    });
  }

  onAssetLoaded(image) {
    this.length += 1;
    console.log(this.length, this.elements.images.length);
  }
}
