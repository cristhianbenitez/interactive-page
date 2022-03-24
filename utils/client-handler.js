const { client } = require('../prismicConfig');

const getArrOfTypes = async (arrOfTypes) =>
  Promise.all(arrOfTypes.map((type) => client.getSingle(type)));

const defaults = async () => {
  const [navigation, meta, preloader] = await getArrOfTypes([
    'navigation',
    'meta',
    'preloader',
  ]);
  return {
    navigation,
    meta,
    preloader,
  };
};

module.exports = { getArrOfTypes, defaults };
