const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports = (entity) => {
  return (req, res, next) => {
    const token = req.cookies.access_token;

    try {
      if (!token) throw new Error();

      const data = jwt.verify(token, config.jwt.secret_key);

      if (!entity.includes(data.rol)) throw new Error('User not Valid');

      next();
    } catch (err) {
      if (err.message) res.status(403).json({ message: err.message });
      else res.status(401).render("error", { status: 401 });
    }
  }
};