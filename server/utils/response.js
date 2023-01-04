const response = (res, status, message, data = null) => {
  const isError = status >= 400;

  res.status(status).json({
    message,
    is_error: isError,
    data: data
  });
}

module.exports = response;