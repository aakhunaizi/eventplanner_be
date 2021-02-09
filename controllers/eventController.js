const { Event } = require("../db/models/");

exports.eventCreate = async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const bulkEvents = await Event.bulkCreate(req.body, {
        validate: true,
      });
      res.status(201).json(bulkEvents);
    } else {
      const newEvent = await Event.create(req.body);
      res.status(201).json(newEvent);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventList = async (req, res) => {
  try {
    const events = await Event.findAll({
      attributes: ["id", "name", "image"],

      order: [
        ["startDate", "ASC"],
        ["name", "ASC"],
      ],
    });
    if (events.length > 0) {
      res.status(200).json(events);
    } else {
      res.status(404).json({ message: "No Events" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.detailedEventList = async (req, res) => {
  try {
    const foundEvent = await Event.findByPk(req.params.eventId);
    if (foundEvent) {
      res.status(200).json(foundEvent);
    } else {
      res.status(404).json({ message: "Event not found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.fullyBooked = async (req, res) => {
  const { Op } = require("sequelize");
  try {
    const fullEvent = await Event.findAll({
      where: {
        numOfSeats: {
          [Op.eq]: bookedSeats,
        },
      },
    });
    if (fullEvent) {
      res.status(200).json(fullEvent);
    } else {
      res.status(404).json({ message: "Event not found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventUpdate = async (req, res) => {
  try {
    const foundEvent = await Event.findByPk(req.params.eventId);
    if (foundEvent) {
      await foundEvent.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventDelete = async (req, res) => {
  try {
    const foundEvent = await Event.findByPk(req.params.eventId);
    if (foundEvent) {
      await foundEvent.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
