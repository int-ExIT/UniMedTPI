function success(res, status, message, body) {
  res.status(status).json({ message, body });
}

function error(res, status, message) {
  res.status(status).json({ message });
}

module.exports = {
  success,
  error,
};