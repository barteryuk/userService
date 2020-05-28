const router = require("express").Router();
const userRoutes = require("./user");

router.get("/", (req, res) => res.send("welcome to userService"));
router.use("/users", userRoutes);

module.exports = router;
