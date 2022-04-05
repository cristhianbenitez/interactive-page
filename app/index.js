import About from 'pages/about';
import Collections from 'pages/collections';
import Details from 'pages/detail';
import Home from 'pages/home';

class App {
  constructor() {
    this.createContent();
    this.createPages();
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
  }
}

new App(); // eslint-disable-line no-new
