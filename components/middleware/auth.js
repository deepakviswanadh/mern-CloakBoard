const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.header("x-auth-token");
  if (!token)
    return res
      .status(401)
      .json({ errors: [{ message: "no token, access denied" }] });
  try {
    let decoded = jwt.verify(token, "notsecret");
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ errors: [{ message: "invalid token" }] });
  }
};
