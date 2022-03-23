/* eslint-disable import/extensions */
const prismicH = require('@prismicio/helpers');
const app = require('./config.js');
const asyncHandler = require('./utils/async-handler.js');
const { client } = require('./prismicConfig.js');

const route = app();
const PORT = route.get('port');

route.listen(PORT, () => {
  process.stdout.write(`Point your browser to: http://localhost:${PORT}\n`);
});

const prismicAutoPreviewsMiddleware = (req, _res, next) => {
  client.enableAutoPreviewsFromReq(req);
  next();
};
route.use(prismicAutoPreviewsMiddleware);

// Middleware to connect to inject prismic context
route.use((req, res, next) => {
  res.locals.ctx = {
    prismicH,
  };
  next();
});

// Route for Previews
route.get(
  '/',
  asyncHandler(async (req, res) => {
    res.render('pages/home');
  })
);
route.get(
  '/about',
  asyncHandler(async (req, res) => {
    const metadata = await client.getByType('meta');
    const aboutPage = await client.getByType('about');
    console.log(metadata.results);
    const [about] = aboutPage.results;
    // console.log(about);

    res.render('pages/about');
  })
);
route.get('/detail/:id', (req, res) => {
  res.render('pages/detail');
});
route.get('/collections', (req, res) => {
  res.render('pages/collections');
});
