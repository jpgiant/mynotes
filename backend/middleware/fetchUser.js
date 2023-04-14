var jwt = require("jsonwebtoken");
const jwt_secret = "Aabcd@fdfdfd34";

const fetchUser = (req, res, next) => {
  //Getting the user from the jwt token and adding id to the request object
  const token = req.header("auth-token");
  // console.log(token)
  if (!token) {
    res.status(401).send({ error: "Please authenticate using valid token" });
  }
  try {
    const verifyData = jwt.verify(token, jwt_secret);
    // console.log(verifyData)
    req.user = verifyData.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using valid token" });
  }
};

module.exports = fetchUser;
