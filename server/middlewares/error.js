exports.generatedErrors = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  if (
    err.name === "MongoServerError" &&
    err.message.includes("E11000 duplicate key")
  ) {
    err.message = "Student with this email address already exists";
    statusCode = 409;
  }

  console.log(err.stack);

  res.status(statusCode).json({
    message: err.message,
    errName: err.name,
    stack: err.stack,
  });
};
