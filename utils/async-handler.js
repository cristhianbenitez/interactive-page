// eslint-disable-next-line consistent-return
const asyncHandler = (callback) => async (req, res, next) => {
  try {
    return await callback(req, res, next);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(404).render('./pages/404');
  }
};
module.exports = asyncHandler;
