const { StatusCodes } = require("http-status-codes");
const db = require("../db/connect");
const { BadRequestError } = require("../error/index");

const createInvoice = async (req, res) => {
  console.log(req.body);
  const {
    currentDate,
    invoiceNumber,
    billedTo,
    amount,
    SGST,
    CGST,
    IGST,
    total,
    TDS,
    amountReceivable,
    status,
    updateDate,
    amountReceived,
    lenderName,
    invoiceType,
    sac,
    typeOfLoan,
    fees,
    billedToAddress,
    billedToGST,
    isMaharastra,
  } = req.body;

  if (
    !currentDate ||
    !invoiceNumber ||
    !billedTo ||
    !amount ||
    !total ||
    !TDS ||
    !amountReceivable ||
    !lenderName ||
    !invoiceType ||
    !sac ||
    !typeOfLoan ||
    !fees ||
    !billedToAddress ||
    !billedToGST
  ) {
    throw new BadRequestError("Invalid credentials");
  }
  const sql =
    "INSERT INTO invoice (invoiceDate, invoiceNumber, billedTo, amount, SGST, CGST, IGST, total, TDS, amountReceivable, updateDate, status, amountReceived, lenderName, invoiceType, sac, typeOfLoan, fees, billedToAddress, billedToGST, isMaharashtra) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
  db.query(
    sql,
    [
      currentDate,
      invoiceNumber,
      billedTo,
      amount,
      !SGST ? 0 : SGST,
      !CGST ? 0 : CGST,
      IGST,
      total,
      TDS,
      amountReceivable,
      updateDate,
      status,
      amountReceived,
      lenderName,
      invoiceType,
      sac,
      typeOfLoan,
      fees,
      billedToAddress,
      billedToGST,
      isMaharastra ? 1 : 0,
    ],
    (err, data) => {
      if (err) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json("invoice creation failed");
      }
      res.status(StatusCodes.CREATED).json(data);
    }
  );
};

const updateInvoice = async (req, res) => {
  const {
    id,
    status,
    amountReceived,
    billedTo,
    amountReceivable,
    amount,
    total,
    TDS,
    CGST,
    SGST,
    IGST,
  } = req.body;
  if (!id) {
    throw new BadRequestError("Invalid credentials");
  }
  let sql =
    "UPDATE invoice SET updateDate = CURRENT_DATE, status = ?, amountReceived = ?, billedTo = ?, amountReceivable = ?, amount = ?, total = ?, TDS = ?, CGST = ?, SGST = ?, IGST = ? WHERE id = ?;";
  db.query(
    sql,
    [
      status,
      amountReceived,
      billedTo,
      amountReceivable,
      amount,
      total,
      TDS,
      CGST,
      SGST,
      IGST,
      id,
    ],
    (err, data) => {
      if (err) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json("invoice creation failed");
      }
      res.status(StatusCodes.OK).json(data);
    }
  );
};

const updateInvoiceData = async (req, res) => {
  console.log(req.body);
  const {
    id,
    SGST,
    CGST,
    IGST,
    total,
    TDS,
    amountReceivable,
    billedTo,
    invoiceDate,
    lenderName,
    amount,
    invoiceType,
    sac,
    typeOfLoan,
    fees,
    billedToAddress,
    billedToGST,
  } = req.body;
  if (!id) {
    throw new BadRequestError("Invalid credentials");
  }
  let sql =
    "UPDATE invoice SET updateDate = CURRENT_DATE, billedTo = ?, SGST = ?,CGST = ?,IGST = ?,total = ?,TDS = ?,amountReceivable = ?, invoiceDate = ?, lenderName = ?, amount = ?, invoiceType = ?, sac = ?, typeOfLoan = ?, fees = ?, billedToAddress = ?, billedToGST = ? WHERE id = ?;";
  db.query(
    sql,
    [
      billedTo,
      SGST,
      CGST,
      IGST,
      total,
      TDS,
      amountReceivable,
      invoiceDate,
      lenderName,
      amount,
      invoiceType,
      sac,
      typeOfLoan,
      fees,
      billedToAddress,
      billedToGST,
      id,
    ],
    (err, data) => {
      console.log(err);
      if (err) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json("invoice update failed");
      }
      res.status(StatusCodes.OK).json(data);
    }
  );
};

const getAllInvoice = async (req, res) => {
  const sql = "SELECT * FROM invoice ORDER BY id DESC;";
  db.query(sql, (err, data) => {
    if (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json("Something went wrong");
    }
    res.status(StatusCodes.OK).json({
      invoices: data,
    });
  });
};

const getNumberOfInvoice = async (req, res) => {
  const sql = "SELECT COUNT(*) FROM invoice";
  db.query(sql, (err, data) => {
    if (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json("Something went wrong");
    }
    res.status(StatusCodes.OK).json({ number: Object.values(data[0])[0] });
  });
};

const getSingleInvoice = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    throw new BadRequestError("Invalid credentials");
  }
  const sql = "SELECT * FROM invoice WHERE id = ?;";
  db.query(sql, [id], (err, data) => {
    if (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json("Something went wrong");
    }
    res.status(StatusCodes.OK).json({ invoice: data[0] });
  });
};

const deleteInvoice = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    throw new BadRequestError("Invalid credentials");
  }
  const sql = "DELETE FROM invoice WHERE id = ?;";
  db.query(sql, [id], (err, data) => {
    if (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json("Something went wrong");
    }
    res.status(StatusCodes.OK).json(data);
  });
};

module.exports = {
  createInvoice,
  updateInvoice,
  getAllInvoice,
  getNumberOfInvoice,
  getSingleInvoice,
  deleteInvoice,
  updateInvoiceData,
};
