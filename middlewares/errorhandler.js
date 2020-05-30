function errorHandler(err, req, res, next) {
  switch (err.code) {
    case 11000:
      return res.status(400).json({
        status: 400,
        message: "Database Validation: Email already exist",
      });

    case 400:
      return res.status(400).json({
        status: 400,
        message: `Database Validation: ${err.message}`,
      });

    case 404:
      return res.status(404).json({
        status: 404,
        message: `Database Validation: ${err.message}`,
      });

    default:
      if (err.errors.email) {
        return res.status(400).json({
          status: 400,
          message: `Database Validation: ${err.errors.email.properties.message}`,
        });
      } else if (err.errors.password) {
        return res.status(400).json({
          status: 400,
          message: `Database Validation: ${err.errors.password.properties.message}`,
        });
      } else if (err.errors.hp) {
        return res.status(400).json({
          status: 400,
          message: `Database Validation: ${err.errors.hp.properties.message}`,
        });
      } else {
        return res.status(500).json({
          status: 500,
          message: "Database Validation: Required Data not found ",
        });
      }
  }
}

module.exports = errorHandler;
