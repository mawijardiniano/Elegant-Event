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

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await eventService.deleteEvent(parseInt(id));
    res.status(200).json({ message: "Event type deleted successfully" });
  } catch (error) {}
};

exports.editEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { event_type } = req.body;

    const editEvent = await eventService.editEvent(parseInt(id), {
      event_type,
    });

    res.status(201).json({
      data: editEvent,
    });

    res.status(200).json({ message: "Event type edited successfully" });
  } catch (error) {}
};
