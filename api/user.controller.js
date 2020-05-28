const Users = require("./user.dao");

exports.create = (req, res, next) => {
  const { email, password } = req.body;
  const newUser = { email, password };

  Users.create(newUser, (err, user) => {
    if (err) {
      // return res.json({ error: err });
      return next(err);
    } else {
      return res.status(201).json(user);

      // return res.status(201).json({
      //   user,
      //   message: "User created successfully",
      // });
    }
  });
};

exports.findAll = (req, res, next) => {
  Users.get({}, (err, users) => {
    if (err) {
      return next(err);
    } else {
      return res.status(200).json(users);

      // return res.status(200).json({
      //   users,
      // });
    }
  });
};

exports.findOne = (req, res, next) => {
  Users.get({ email: req.params.email }, (err, user) => {
    if (err) {
      return next(err);
    } else {
      return res.status(200).json(user);

      // if (user.length === 0) {
      //   return res.status(404).json({
      //     user,
      //     message: "User not found",
      //   });
      // } else {
      //   return res.status(200).json({
      //     user,
      //     message: "User found",
      //   });
      // }
    }
  });
};

exports.put = (req, res, next) => {
  const { email, password } = req.body;
  const updateUser = { email, password };

  Users.update({ _id: req.params.id }, updateUser, (err, user) => {
    // Users.updateOne({ _id: req.params.id }, updateUser, (err, user) => {
    if (err) {
      return next(err);
    } else {
      return res.status(200).json(user);
      // if (user === null) {
      //   return res.status(404).json({
      //     user,
      //     message: "User not found",
      //   });
      // } else {
      //   return res.status(200).json({
      //     user,
      //     message: "User updated successfully",
      //   });
      // }
    }
  });
};

exports.delete = (req, res, next) => {
  Users.delete({ _id: req.params.id }, (err, user) => {
    // Users.deleteOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return next(err);
    } else {
      return res.status(200).json(user);

      // if (user === null) {
      //   return res.status(404).json({
      //     user,
      //     message: "User not found",
      //   });
      // } else {
      //   return res.status(200).json({
      //     user,
      //     message: "User deleted successfully",
      //   });
      // }
    }
  });
};
