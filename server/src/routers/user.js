const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { tokenVerify } = require("../utils/jwttoken");
const { tryCatch } = require("../utils/tryCatch");
const { upload } = require('../helpers/multer');

router
  .route("/signup")

  .post(upload.single('image'),tryCatch(userController.registration))

router
  .route("/login")

  .post(tryCatch(userController.login))

router.route("/user/:id")
.get(tokenVerify,tryCatch(userController.getUser))
.put(tokenVerify,tryCatch(userController.updateUser))
.delete(tokenVerify,tryCatch(userController.deleteUser))



module.exports = router;
