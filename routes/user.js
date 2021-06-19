//*** import third party packages
const express = require("express");
const validUrl = require("valid-url");

//** import controllers
const userController = require("../controllers/user");

// creating express route handler
const router = express.Router();


router.get("/signup", userController.getSignup);

// router.get("/:shortCode", urlController.getLongUrl);

// router.post("/shortme", urlController.postShortURL);


module.exports = router;