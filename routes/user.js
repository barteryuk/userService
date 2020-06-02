const router = require("express").Router();
const Controller = require("../api/user.controller");

router.post("/login", Controller.login);
router.post("/", Controller.create);
router.get("/", Controller.findAll);
router.get("/:email/:id", Controller.findOne);
router.get("/:id", Controller.findById);
router.put("/:id", Controller.put);
router.delete("/:id", Controller.delete);

module.exports = router;
