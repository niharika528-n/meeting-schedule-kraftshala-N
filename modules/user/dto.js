exports.validateCreateUser = (data) => {
  if (!data.name || !data.email) {
    throw new Error("Name and email are required");
  }
};
