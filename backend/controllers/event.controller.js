const eventService = require("../services/event.service");

exports.getEvents = async (req, res) => {
  try {
    const events = await eventService.getEvents();
    res.json(events);
  } catch (error) {
    console.error("Error fetching events", error);
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { event_type } = req.body;
    const event = await eventService.createEvent({ event_type });

    res.status(201).json(event);
  } catch (error) {
    console.error("Error adding events", error);
  }
};
