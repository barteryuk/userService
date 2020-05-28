function errorHandler(err, req, res, next) {
  switch (err.code) {
    case 11000:
      return res.status(400).json({
        status: 400,
        errors: err,
        message: "Database Validation: Email already exist",
      });

    default:
      return res.status(500).json({
        status: 500,
        errors: err,
        message: "Database Validation: Required Data not found ",
      });
  }
}

module.exports = errorHandler;
