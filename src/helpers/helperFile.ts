import jwt from "jsonwebtoken";
import { NextFunction, Request, response, Response } from "express";
const SECRET_KEY = "E_COMMERCE_SECRET_KEY";
// create jwt
export const getJWT = (payload: any) => {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: "1d",
  });
};

declare module "express" {
  interface Request {
    user?: any;
  }
}
// function for authenticating the token
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // request tokein in authentication header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // if token is not provided, then throw an error
  if (token == null) {
    throw {
      statusCode: 401,
      customMessage: "Token is required",
    };
  }
  try {
    // verify token
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    next({
      statusCode: 403,
      customMessage: "Unauthorized  access",
    });
  }
};

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== "admin") {
    throw {
      statusCode: 400,
      customMessage: "Access denied!",
    };
  }
};
