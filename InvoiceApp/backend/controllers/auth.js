const db = require("../db/connect");
const { StatusCodes } = require("http-status-codes");
const { UnAuthenticatedError } = require("../error/index");

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new UnAuthenticatedError("Invalid credentials");
  }
  const sql = "SELECT * FROM user WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, data) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).json("login failed");
    }
    res.status(StatusCodes.OK).json(data);
  });
};

module.exports = {
  loginUser,
};
