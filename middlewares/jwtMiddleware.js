class JWTMiddleware {
  validate(req, res, next) {}
  validateAdmin(req, res, next) {}
}

export const jwtMiddleware = new JWTMiddleware();
