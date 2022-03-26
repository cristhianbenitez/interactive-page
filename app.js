const prismicH = require('@prismicio/helpers');
const app = require('./config');
const asyncHandler = require('./utils/async-handler');
const { client } = require('./prismicConfig');
const clientHandler = require('./utils/client-handler');

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

// Link resolvers for prismic navigation
const linkResolver = (doc) => {
  if (doc.type === 'product') return `/detail/${doc.slug}`;
  if (doc.type === 'about') return `/about`;
  return '/';
};

// Middleware to connect to inject prismic context
route.use((req, res, next) => {
  res.locals.Link = linkResolver;
  res.locals.ctx = {
    prismicH,
  };
  next();
});

// Route for Previews
route.get('/preview', async (req, res) => {
  const redirectURL = await client.resolvePreviewURL({ defaultURL: '/' });
  res.redirect(302, redirectURL);
});

route.get(
  '/',
  asyncHandler(async (req, res) => {
    const defaults = await clientHandler.defaults();
    const home = await client.getSingle('home');
    const { results: collections } = await client.getByType('collection', {
      fetchLinks: 'product.image',
    });

    res.render('pages/home', {
      collections,
      home,
      ...defaults,
    });
  })
);

route.get(
  '/about',
  asyncHandler(async (req, res) => {
    const defaults = await clientHandler.defaults();
    const about = await client.getSingle('about');

    console.log(about.data.body);
    res.render('pages/about', {
      about,
      ...defaults,
    });
  })
);

route.get(
  '/detail/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const defaults = await clientHandler.defaults();
    const product = await client.getByUID('product', id, {
      fetchLinks: 'collection.title',
    });

    res.render('pages/detail', { product, ...defaults });
  })
);

route.get(
  '/collections',
  asyncHandler(async (req, res) => {
    const defaults = await clientHandler.defaults();
    const home = await client.getSingle('home');
    const { results: collections } = await client.getByType('collection', {
      fetchLinks: 'product.image',
    });

    res.render('pages/collections', { collections, home, ...defaults });
  })
);
