import jwt from "jsonwebtoken";

export const getJWT = (payload: any) => {
  return jwt.sign(payload, "E_COMMERCE_SECRET_KEY", {
    expiresIn: "1h",
  });
};
