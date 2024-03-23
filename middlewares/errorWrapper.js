function AsyncWrapper(routeHandler) {
  return async (req, res, next) => {
    try {
      await routeHandler(req, res, next); // Call the route handler function
    } catch (error) {
      // Pass the error to the error handling middleware
      next(error);
    }
  };
}

module.exports = AsyncWrapper;
