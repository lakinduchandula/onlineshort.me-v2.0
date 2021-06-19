//*** import third party packages
const express = require("express");
const { body } = require('express-validator');


//** import controllers
const urlController = require("../controllers/url");

// creating express route handler
const router = express.Router();


router.get("/", urlController.getIndex);

router.get("/:shortCode", body('longUrl').not().isEmpty(), urlController.getLongUrl);

router.post("/shortme", urlController.postShortURL);


module.exports = router;
