const express = require('express');
const router = express.Router();
const shrinkController = require("../controller/shrink.controller")

// add url
router.post("/createShortUrls", shrinkController.createShortUrls)

// display urls
router.post("/displayShortUrls", shrinkController.displayShortUrls)

// display graph urls
router.post("/displayGraphUrls", shrinkController.displayGraphUrls)

// url by shortid
router.post("/displayUrlById/:id", shrinkController.displayUrlById)

// click url
router.post("/clickToShortUrl/:id", shrinkController.clickToShortUrl)


// click url
router.post("/urlVisibility", shrinkController.urlVisibility)

// date url
router.post("/getUrlsOnDate/:id", shrinkController.getUrlsOnDate)

module.exports = router;