// node-fetch is used to make network requests to the Prismic Rest API.
// In Node.js Prismic projects, you must provide a fetch method to the
// Prismic client.
const fetch = require('node-fetch-commonjs');
const prismic = require('@prismicio/client');

const repoName = 'floema-page';
const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

const endpoint = prismic.getEndpoint(repoName);

const client = prismic.createClient(endpoint, {
  accessToken,
  fetch,

  // This defines how you will structure URL paths in your project.
  // Update the types to match the Custom Types in your project, and edit
  // the paths to match the routing in your project.
  routes: [
    {
      type: 'home',
      path: '/',
    },
  ],
});

module.exports = {
  client,
  repoName,
};

//  {
//     type: 'detail',
//     path: '/detail/:id',
//   },
