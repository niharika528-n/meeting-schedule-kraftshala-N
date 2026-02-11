const userService = require("./service");
const { validateCreateUser } = require("./dto");

exports.createUser = async (req, res, next) => {
  try {
    validateCreateUser(req.body);
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
