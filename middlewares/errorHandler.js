function errorHandler(err, req, res, next) {
  console.error(err); // Log the error for debugging purposes

  // Send an appropriate response to the client
  res.status(500).send({
    error: "Internal Server Error",
    message: err.message, // You can customize this message as needed
  });
}

module.exports = errorHandler;
