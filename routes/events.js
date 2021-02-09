const express = require("express");

const {
  eventCreate,
  eventList,
  eventUpdate,
  eventDelete,
  detailedEventList,
  fullyBooked,
} = require("../controllers/eventController");
const router = express.Router();

router.post("/", eventCreate);
router.get("/full", fullyBooked);
router.get("/", eventList);
router.get("/:eventId", detailedEventList);
router.put("/:eventId", eventUpdate);
router.delete("/:eventId", eventDelete);

module.exports = router;
