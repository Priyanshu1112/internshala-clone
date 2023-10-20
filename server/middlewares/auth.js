const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const { catchAsyncErrors } = require("./catchAsyncErrors");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return next(new ErrorHandler("Please login to access the resource", 401));

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.id = id;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.clearCookie("token");
      res.clearCookie("user_role");
      return next(
        new ErrorHandler("Token Expired: Please login again to continue", 401)
      );
    }
  }

  //   res.json({ id, token });
  next();
});
