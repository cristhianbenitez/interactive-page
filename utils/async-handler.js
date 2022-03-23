const asyncHandler = (callback) => async (req, res, next) => {
  try {
    return await callback(req, res, next);
  } catch (err) {
    console.error(err);
    res.status(404).render('./error_handlers/404');
  }
};
module.exports = asyncHandler;
