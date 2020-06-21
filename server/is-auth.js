const jwt = require("jsonwebtoken");
const { secretOrKey } = require("./config/keys");

module.exports = (req, res, next) => {
  //const token = req.headers.authorization || "";
  const authHeader = req.headers.authorization || ''
  console.log(`auth header is ${authHeader}`);
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, secretOrKey);
  } catch (error) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.userId = decodedToken._id;
  next();
};
