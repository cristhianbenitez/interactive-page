const prismicH = require('@prismicio/helpers');
const app = require('./config');
const asyncHandler = require('./utils/async-handler');
const { client } = require('./prismicConfig');

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
    const about = await client.getSingle('about');
    const meta = await client.getSingle('meta');

    res.render('pages/about', {
      about,
      meta,
    });
  })
);
route.get(
  '/detail/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await client.getByUID('product', id, {
      fetchLinks: 'collection.title',
    });
    console.log(product.data);
    res.render('pages/detail', { product });
  })
);
route.get('/collections', (req, res) => {
  res.render('pages/collections');
});
