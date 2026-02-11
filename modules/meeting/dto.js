exports.validateMeeting = ({ userId, title, startTime, endTime }) => {
  if (!userId || !title || !startTime || !endTime) {
    throw new Error("All fields are required");
  }

  if (new Date(startTime) >= new Date(endTime)) {
    throw new Error("startTime must be before endTime");
  }
};
