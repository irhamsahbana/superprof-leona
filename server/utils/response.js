const response = (res, status, message, data) => {
  res.status(status).json({ message, data: data });
}

module.exports = response;