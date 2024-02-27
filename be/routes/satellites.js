const express = require("express");

const router = express.Router();

const {
  getSatellites,
  getBrightedSatelliteImage,
} = require("../controllers/satellites");

router.route("/").get(getSatellites);
router.route("/:brightId").get(getBrightedSatelliteImage);

module.exports = router;
