import jwt from "jsonwebtoken";
import { ENV } from "../../env.js";
export const authenticateMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "access denied" });
  }

  // decoding the token info
  try {
    const decodedToken = jwt.verify(token, ENV.JWT_SECRET_KEY);
    req.userinfo = decodedToken;

    next();
  } catch (error) {
    console.log(error.message);

    return res
      .status(401)
      .json({ success: false, message: "unknown token info" });
  }
};

/// admin authentication role based
export const adminChecker = (req, res, next) => {
  const { role } = req.userinfo;

  try {
    if (role === "admin") {
      return next();
    }
    return res.json({
      success: false,
      message: "access denied you don't have the privileges",
    });
  } catch (error) {
    console.log(error.message);
  }
};

/// worker authentication role based

export const workerChecker = (req, res, next) => {
  const { role } = req.userinfo;

  if (role == "worker") {
    return next();
  }
  return res.json({
    success: false,
    message: "access denied you don't have the privileges",
  });
};
