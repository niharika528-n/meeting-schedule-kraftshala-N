const Meeting = require("./model");
const { Op } = require("sequelize");

async function hasConflict({ userId, startTime, endTime, excludeId }) {
  return Meeting.findOne({
    where: {
      userId,
      ...(excludeId && { id: { [Op.ne]: excludeId } }),
      startTime: { [Op.lt]: endTime },
      endTime: { [Op.gt]: startTime }
    }
  });
}

exports.createMeeting = async (data) => {
  const conflict = await hasConflict(data);
  if (conflict) {
    const err = new Error("Time slot already booked");
    err.statusCode = 400;
    throw err;
  }
  return Meeting.create(data);
};

exports.getMeetings = async (query) => {
  const where = {};
  if (query.userId) where.userId = query.userId;
  return Meeting.findAll({ where });
};

exports.getMeetingById = async (id) => {
  const meeting = await Meeting.findByPk(id);
  if (!meeting) {
    const err = new Error("Meeting not found");
    err.statusCode = 404;
    throw err;
  }
  return meeting;
};

exports.updateMeeting = async (id, data) => {
  const meeting = await exports.getMeetingById(id);

  const conflict = await hasConflict({
    ...data,
    userId: meeting.userId,
    excludeId: id
  });

  if (conflict) {
    const err = new Error("Time slot already booked");
    err.statusCode = 400;
    throw err;
  }

  return meeting.update(data);
};

exports.deleteMeeting = async (id) => {
  const meeting = await exports.getMeetingById(id);
  await meeting.destroy();
};
