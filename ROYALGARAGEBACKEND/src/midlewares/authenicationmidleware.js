import jwt from "jsonwebtoken";
import { ENV } from "../../env.js";
export const authenicateMiddleware = (req, res, next) => {
  // geting token from the front end headers
  const authheader = req.headers["authorization"];
  console.log(authheader);

  // spliting it to get the token stirng only

  const token = authheader && authheader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "acces denied" });
  }

  // decoding the token info
  try {
    const decodedToken = jwt.verify(token, ENV.JWT_SECERECT_KEY);
    console.log(decodedToken);

    req.userinfo = decodedToken;

    next();
  } catch (error) {
    console.log(error.message);

    return res
      .status(401)
      .json({ success: false, message: "unkwon token info" });
  }
};
