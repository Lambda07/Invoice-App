const db = require("../db/connect");
const { StatusCodes } = require("http-status-codes");

const getAllClients = async (req, res) => {
  const sql = "SELECT * FROM clientDatabase ORDER BY clientName ASC;";
  db.query(sql, (err, data) => {
    if (err) {
      throw new Error("Internal Server Error");
    }
    res.status(StatusCodes.OK).json({ clients: data });
  });
};

const addClient = async (req, res) => {
  const { name, address, gst, state } = req.body;
  const sql =
    "INSERT INTO clientDatabase (clientName, address, GSTNo, state) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, address, gst, state], (err, data) => {
    if (err) {
      throw new Error("Internal Server Error");
    }
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Client added successfully" });
  });
};

const addLender = async (req, res) => {
  const { name } = req.body;
  const sql = "INSERT INTO lender (name) VALUES (?)";
  db.query(sql, [name], (err, data) => {
    if (err) {
      throw new Error("Internal Server Error");
    }
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Lender added successfully" });
  });
};

const getAllLenders = async (req, res) => {
  const sql = "SELECT * FROM lender ORDER BY name ASC;";
  db.query(sql, (err, data) => {
    if (err) {
      throw new Error("Internal Server Error");
    }
    res.status(StatusCodes.OK).json({ lenders: data });
  });
};

const getSingleClient = async (req, res) => {
  const sql = "SELECT * FROM clientDatabase WHERE id = ?";
  db.query(sql, [req.params.id], (err, data) => {
    if (err) {
      throw new Error("Internal Server Error");
    }
    res.status(StatusCodes.OK).json({ client: data });
  });
};

const getSingleLender = async (req, res) => {
  const sql = "SELECT * FROM lender WHERE id = ?";
  db.query(sql, [req.params.id], (err, data) => {
    if (err) {
      throw new Error("Internal Server Error");
    }
    res.status(StatusCodes.OK).json({ lender: data });
  });
};

const updateClient = async (req, res) => {
  const { id, clientName, address, gstNumber, state } = req.body;
  const sql =
    "UPDATE clientDatabase SET clientName = ?, address = ?, GSTNo = ?, state = ? WHERE id = ?";
  db.query(sql, [clientName, address, gstNumber, state, id], (err, data) => {
    if (err) {
      throw new Error("Internal Server Error");
    }
    res.status(StatusCodes.OK).json({ message: "Client updated successfully" });
  });
};

const deleteClient = async (req, res) => {
  const sql = "DELETE FROM clientDatabase WHERE id = ?";
  db.query(sql, [req.params.id], (err, data) => {
    if (err) {
      throw new Error("Internal Server Error");
    }
    res.status(StatusCodes.OK).json({ message: "Client deleted successfully" });
  });
};

const updateLender = async (req, res) => {
  const { id, name } = req.body;
  const sql = "UPDATE lender SET name = ? WHERE id = ?";
  db.query(sql, [name, id], (err, data) => {
    if (err) {
      throw new Error("Internal Server Error");
    }
    res.status(StatusCodes.OK).json({ message: "Lender updated successfully" });
  });
};

const deleteLender = async (req, res) => {
  const sql = "DELETE FROM lender WHERE id = ?";
  db.query(sql, [req.params.id], (err, data) => {
    if (err) {
      throw new Error("Internal Server Error");
    }
    res.status(StatusCodes.OK).json({ message: "Lender deleted successfully" });
  });
};

module.exports = {
  getAllClients,
  getAllLenders,
  addClient,
  addLender,
  getSingleClient,
  getSingleLender,
  updateClient,
  deleteClient,
  updateLender,
  deleteLender,
};
