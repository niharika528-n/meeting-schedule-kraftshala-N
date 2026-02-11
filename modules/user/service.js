const User = require("./model");

exports.createUser = async (data) => {
  return User.create(data);
};

exports.getUserById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }
  return user;
};
