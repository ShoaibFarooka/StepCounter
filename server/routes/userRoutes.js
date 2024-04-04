const router = require("express").Router();
const controller = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", controller.Register);

router.post("/login", controller.Login);

router.get(
  "/get-users",
  controller.GetUsers,
);

router.post(
  "/step-count",
  authMiddleware.stripToken,
  authMiddleware.verifyToken,
  controller.stepCount
);

router.get(
  "/allow-input",
  authMiddleware.stripToken,
  authMiddleware.verifyToken,
  controller.shouldAllowInput
);

router.patch("/reset-steps",
  authMiddleware.stripToken,
  authMiddleware.verifyToken,
  controller.resetSteps
);

module.exports = router;
