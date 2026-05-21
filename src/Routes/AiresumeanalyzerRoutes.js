const express = require("express");
const router = express.Router();
const upload = require("../Middleware/upload");
const controller =require("../Controllers/AiresumeanalyzerController");
const { validate } =require("../Validators/AiresumeanalyzerValidator");

router.post("/check",upload.single("file"),  validate,controller.check);

module.exports = router;