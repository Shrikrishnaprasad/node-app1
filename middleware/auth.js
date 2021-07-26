import jwt from "jsonwebtoken";

export const auth = (request, response, next) => {
  const token = request.header("x-auth-token");
  try {
    jwt.verify(token, process.env.SECERET_KEY);
    next();
  } catch (error) {
    response.status(401);
    response.send({ err: error.message });
  }
};
