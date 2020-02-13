
  const JWT_SEC = process.env.JWT_PASS;
  const JWT_REF_SEC = process.env.JWT_REF
  const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const headerAuthProp = req.headers['authorization'];
      const token = headerAuthProp && headerAuthProp.spilit(' ')[1];
      if(token === null) return res.sendStatus(401)
      jwt.verify(token, JWT_SEC, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
      })
  }
  


module.exports = authenticateToken;