// node-fetch is used to make network requests to the Prismic Rest API.
// In Node.js Prismic projects, you must provide a fetch method to the
// Prismic client.
import fetch from 'node-fetch';
import * as prismic from '@prismicio/client';

const prismicEndPoint = process.env.PRISMIC_ENDPOINT;
const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

const endpoint = prismic.getEndpoint(prismicEndPoint);

export const client = prismic.createClient(endpoint, {
  accessToken,
  fetch,

  // This defines how you will structure URL paths in your project.
  // Update the types to match the Custom Types in your project, and edit
  // the paths to match the routing in your project.
  routes: (doc) => {
    if (doc.type === 'page') return `/${doc.lang}/${doc.uid}`;
    if (doc.type === 'homepage') return `/${doc.lang}`;
    return '/';
  },
  // routes: [
  //   {
  //     type: 'home',
  //     path: '/',
  //   },
  //   {
  //     type: 'about',
  //     path: '/about',
  //   },
  //   {
  //     type: 'collections',
  //     path: '/collections',
  //   },
  //   {
  //     type: 'detail',
  //     path: '/detail/:id',
  //   },
  // ],
});
