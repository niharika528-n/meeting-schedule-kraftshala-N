const service = require("./service");
const { validateMeeting } = require("./dto");

exports.createMeeting = async (req, res, next) => {
  try {
    validateMeeting(req.body);
    const meeting = await service.createMeeting(req.body);
    res.status(201).json(meeting);
  } catch (err) {
    next(err);
  }
};

exports.getMeetings = async (req, res, next) => {
  try {
    const meetings = await service.getMeetings(req.query);
    res.json(meetings);
  } catch (err) {
    next(err);
  }
};

exports.getMeeting = async (req, res, next) => {
  try {
    const meeting = await service.getMeetingById(req.params.id);
    res.json(meeting);
  } catch (err) {
    next(err);
  }
};

exports.updateMeeting = async (req, res, next) => {
  try {
    const meeting = await service.updateMeeting(req.params.id, req.body);
    res.json(meeting);
  } catch (err) {
    next(err);
  }
};

exports.deleteMeeting = async (req, res, next) => {
  try {
    await service.deleteMeeting(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
