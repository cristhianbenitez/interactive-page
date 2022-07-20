import each from 'lodash/each';

import About from 'pages/about';
import Collections from 'pages/collections';
import Details from 'pages/detail';
import Home from 'pages/home';

import Preloader from './components/Preloader';

class App {
  constructor() {
    this.createPreloader();
    this.createContent();
    this.createPages();

    this.addLinkListeners();
  }

  createPreloader() {
    this.preloader = new Preloader();
    this.preloader.once('completed', this.onPreloaded());
  }

  createContent() {
    this.content = document.querySelector('.content');
    this.template = this.content.getAttribute('data-template');
  }

  createPages() {
    this.pages = {
      about: new About(),
      collections: new Collections(),
      details: new Details(),
      home: new Home(),
    };

    this.page = this.pages[this.template];
    this.page.create();
    this.page.show();
  }

  async onChange(url) {
    await this.page.hide();

    const request = await window.fetch(url);

    try {
      const html = await request.text();
      const div = document.createElement('div');

      div.innerHTML = html;

      const divContent = div.querySelector('.content');

      this.template = divContent.getAttribute('data-template');
      this.content.innerHTML = divContent.innerHTML;
      this.content.setAttribute('data-template', this.template);

      this.page = this.pages[this.template];
      this.page.create();
      this.page.show();

      this.addLinkListeners();
    } catch (error) {
      console.error('error');
    }
  }

  onPreloaded() {
    console.log('preloaded!');
  }

  addLinkListeners() {
    const links = document.querySelectorAll('a');

    each(links, (link) => {
      // eslint-disable-next-line no-param-reassign
      link.onclick = (e) => {
        const { href } = link;
        e.preventDefault();

        this.onChange(href);
      };
    });
  }
}

new App(); // eslint-disable-line no-new
