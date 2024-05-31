import React, { useState, useEffect } from "react";
import axios from "axios";
import "../axios";
import moment from "moment-timezone";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Header from "../header/Header";
import { HiSortAscending, HiSortDescending } from "react-icons/hi";

function Dashboard() {
  const navigate = useNavigate();

  const [invoices, setInvoices] = useState([
    {
      id: 11,
      invoiceDate: "2024-02-09T18:30:00.000Z",
      invoiceNumber: "001/23-24",
      billedTo: "Mangal Finance Limited",
      amount: 7500,
      SGST: 0,
      CGST: 0,
      IGST: 18,
      total: 8850,
      TDS: 750,
      amountReceivable: 8100,
      updateDate: null,
      status: null,
      amountReceived: null,
    },
  ]);

  const [filter, setFilter] = useState({
    fromInvoiceDate: new Date("2024-02-01"),
    toInvoiceDate: new Date("2030-08-15"),
    invoiceNumberFilter: "",
    billedToFilter: "",
    amountReceivableFilterLessThan: "",
    amountReceivableFilterMoreThan: "",
    statusFilter: "",
    amountReceivedFilterLessThan: "",
    amountReceivedFilterMoreThan: "",
    amountFilterLessThan: "",
    amountFilterMoreThan: "",
  });

  const [filteredInvoices, setFilteredInvoices] = useState([
    {
      id: 11,
      invoiceDate: "2024-02-09T18:30:00.000Z",
      invoiceNumber: "001/23-24",
      billedTo: "Mangal Finance Limited",
      amount: 7500,
      SGST: 0,
      CGST: 0,
      IGST: 18,
      total: 8850,
      TDS: 750,
      amountReceivable: 8100,
      updateDate: null,
      status: null,
      amountReceived: null,
    },
  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("/invoice/getAllInvoice");
        setInvoices(data.invoices);
        setFilteredInvoices(data.invoices); // Set initially to the same list
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = invoices.filter((invoice) => {
      const invoiceDate = moment(invoice.invoiceDate);
      const fromInvoiceDate = moment(filter.fromInvoiceDate);
      const toInvoiceDate = moment(filter.toInvoiceDate);
      let isDateInRange = true;
      if (fromInvoiceDate && toInvoiceDate) {
        isDateInRange =
          invoiceDate.isSameOrAfter(fromInvoiceDate.clone(), "day") &&
          invoiceDate.isSameOrBefore(toInvoiceDate.clone(), "day");
      }

      const isInvoiceNumberMatch = invoice.invoiceNumber
        .split("/")[0]
        .includes(filter.invoiceNumberFilter);
      const isBilledToMatch = invoice.billedTo
        .toLowerCase()
        .includes(filter.billedToFilter.toLowerCase());

      const isAmountLessThan =
        filter.amountFilterLessThan === "" ||
        invoice.amount < parseFloat(filter.amountFilterLessThan);

      const isAmountMoreThan =
        filter.amountFilterMoreThan === "" ||
        invoice.amount > parseFloat(filter.amountFilterMoreThan);

      const isAmountReceivableLessThan =
        filter.amountReceivableFilterLessThan === "" ||
        invoice.amountReceivable <
          parseFloat(filter.amountReceivableFilterLessThan);

      const isAmountReceivableMoreThan =
        filter.amountReceivableFilterMoreThan === "" ||
        invoice.amountReceivable >
          parseFloat(filter.amountReceivableFilterMoreThan);

      const isStatusMatch =
        filter.statusFilter === "" ||
        invoice.status.toLowerCase() === filter.statusFilter.toLowerCase();

      const isAmountReceivedLessThan =
        filter.amountReceivedFilterLessThan === "" ||
        invoice.amountReceived <
          parseFloat(filter.amountReceivedFilterLessThan);

      const isAmountReceivedMoreThan =
        filter.amountReceivedFilterMoreThan === "" ||
        invoice.amountReceived >
          parseFloat(filter.amountReceivedFilterMoreThan);

      return (
        isDateInRange &&
        isInvoiceNumberMatch &&
        isBilledToMatch &&
        isAmountReceivableLessThan &&
        isAmountReceivableMoreThan &&
        isStatusMatch &&
        isAmountReceivedLessThan &&
        isAmountReceivedMoreThan &&
        isAmountLessThan &&
        isAmountMoreThan
      );
    });

    setFilteredInvoices(filtered);
  }, [invoices, filter]);

  const handleClick = (id) => {
    navigate(`/dashboard/${id}`);
  };

  const [order, setOrder] = useState("ASC");
  const [iconPosition, setIconPosition] = useState("invoiceNumber");

  const sorting = (key) => {
    if (key === "invoiceDate") {
      const sorted = [...filteredInvoices].sort((a, b) => {
        if (order === "ASC") {
          return moment(a[key]).isAfter(moment(b[key])) ? 1 : -1;
        } else {
          return moment(a[key]).isBefore(moment(b[key])) ? 1 : -1;
        }
      });
      setIconPosition("invoiceDate");
      setOrder(order === "ASC" ? "DESC" : "ASC");
      setFilteredInvoices(sorted);
    } else if (key === "amount") {
      const sorted = [...filteredInvoices].sort((a, b) => {
        if (order === "ASC") {
          return a[key] > b[key] ? 1 : -1;
        } else {
          return a[key] < b[key] ? 1 : -1;
        }
      });
      setIconPosition("amount");
      setOrder(order === "ASC" ? "DESC" : "ASC");
      setFilteredInvoices(sorted);
    } else if (key === "amountReceivable") {
      const sorted = [...filteredInvoices].sort((a, b) => {
        if (order === "ASC") {
          return a[key] > b[key] ? 1 : -1;
        } else {
          return a[key] < b[key] ? 1 : -1;
        }
      });
      setIconPosition("amountReceivable");
      setOrder(order === "ASC" ? "DESC" : "ASC");
      setFilteredInvoices(sorted);
    } else if (key === "amountReceived") {
      const sorted = [...filteredInvoices].sort((a, b) => {
        if (order === "ASC") {
          return a[key] > b[key] ? 1 : -1;
        } else {
          return a[key] < b[key] ? 1 : -1;
        }
      });
      setIconPosition("amountReceived");
      setOrder(order === "ASC" ? "DESC" : "ASC");
      setFilteredInvoices(sorted);
    } else if (key === "billedTo") {
      const sorted = [...filteredInvoices].sort((a, b) => {
        if (order === "ASC") {
          return a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1;
        } else {
          return a[key].toLowerCase() < b[key].toLowerCase() ? 1 : -1;
        }
      });
      setIconPosition("billedTo");
      setOrder(order === "ASC" ? "DESC" : "ASC");
      setFilteredInvoices(sorted);
    } else if (key === "TDS") {
      const sorted = [...filteredInvoices].sort((a, b) => {
        if (order === "ASC") {
          return a[key] > b[key] ? 1 : -1;
        } else {
          return a[key] < b[key] ? 1 : -1;
        }
      });
      setIconPosition("TDS");
      setFilteredInvoices(sorted);
      setOrder(order === "ASC" ? "DESC" : "ASC");
    } else if (key === "total") {
      const sorted = [...filteredInvoices].sort((a, b) => {
        if (order === "ASC") {
          return a[key] > b[key] ? 1 : -1;
        } else {
          return a[key] < b[key] ? 1 : -1;
        }
      });
      setIconPosition("total");
      setFilteredInvoices(sorted);
      setOrder(order === "ASC" ? "DESC" : "ASC");
    } else if (key === "CGST") {
      const sorted = [...filteredInvoices].sort((a, b) => {
        if (order === "ASC") {
          return a[key] > b[key] ? 1 : -1;
        } else {
          return a[key] < b[key] ? 1 : -1;
        }
      });
      setIconPosition("CGST");
      setFilteredInvoices(sorted);
      setOrder(order === "ASC" ? "DESC" : "ASC");
    } else if (key === "SGST") {
      const sorted = [...filteredInvoices].sort((a, b) => {
        if (order === "ASC") {
          return a[key] > b[key] ? 1 : -1;
        } else {
          return a[key] < b[key] ? 1 : -1;
        }
      });
      setIconPosition("SGST");
      setFilteredInvoices(sorted);
      setOrder(order === "ASC" ? "DESC" : "ASC");
    } else if (key === "IGST") {
      const sorted = [...filteredInvoices].sort((a, b) => {
        if (order === "ASC") {
          return a[key] > b[key] ? 1 : -1;
        } else {
          return a[key] < b[key] ? 1 : -1;
        }
      });
      setIconPosition("IGST");
      setFilteredInvoices(sorted);
      setOrder(order === "ASC" ? "DESC" : "ASC");
    } else if (key === "invoiceNumber") {
      const sorted = [...filteredInvoices].sort((a, b) => {
        if (order === "ASC") {
          return a["id"] > b["id"] ? 1 : -1;
        } else {
          return a["id"] < b["id"] ? 1 : -1;
        }
      });
      setIconPosition("invoiceNumber");
      setFilteredInvoices(sorted);
      setOrder(order === "ASC" ? "DESC" : "ASC");
    }
  };

  return (
    <>
      <Header />
      <div className="Dashboard">
        <a href="/createInvoice">Create new invoice</a>
        <div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>
                    <span>Sr. no</span>
                  </th>
                  <th onClick={() => sorting("invoiceDate")}>
                    <span>Invoice Date</span>
                    <br />
                    {iconPosition === "invoiceDate" ? (
                      order === "ASC" ? (
                        <HiSortAscending size={20} />
                      ) : (
                        <HiSortDescending size={20} />
                      )
                    ) : null}
                  </th>
                  <th onClick={() => sorting("invoiceNumber")}>
                    <span>Invoice Number</span>
                    <br />
                    {iconPosition === "invoiceNumber" ? (
                      order === "ASC" ? (
                        <HiSortAscending size={20} />
                      ) : (
                        <HiSortDescending size={20} />
                      )
                    ) : null}
                  </th>
                  <th onClick={() => sorting("billedTo")}>
                    <span>Billed to</span>
                    <br />
                    {iconPosition === "billedTo" ? (
                      order === "ASC" ? (
                        <HiSortAscending size={20} />
                      ) : (
                        <HiSortDescending size={20} />
                      )
                    ) : null}
                  </th>
                  <th onClick={() => sorting("amount")}>
                    <span>Amount</span>
                    <br />
                    {iconPosition === "amount" ? (
                      order === "ASC" ? (
                        <HiSortAscending size={20} />
                      ) : (
                        <HiSortDescending size={20} />
                      )
                    ) : null}
                  </th>
                  <th onClick={() => sorting("SGST")}>
                    <span>SGST</span>
                    <br />
                    {iconPosition === "SGST" ? (
                      order === "ASC" ? (
                        <HiSortAscending size={20} />
                      ) : (
                        <HiSortDescending size={20} />
                      )
                    ) : null}
                  </th>
                  <th onClick={() => sorting("CGST")}>
                    <span>CGST</span>
                    <br />
                    {iconPosition === "CGST" ? (
                      order === "ASC" ? (
                        <HiSortAscending size={20} />
                      ) : (
                        <HiSortDescending size={20} />
                      )
                    ) : null}
                  </th>
                  <th onClick={() => sorting("IGST")}>
                    <span>IGST</span>
                    <br />
                    {iconPosition === "IGST" ? (
                      order === "ASC" ? (
                        <HiSortAscending size={20} />
                      ) : (
                        <HiSortDescending size={20} />
                      )
                    ) : null}
                  </th>
                  <th onClick={() => sorting("total")}>
                    <span>Total</span>
                    <br />
                    {iconPosition === "total" ? (
                      order === "ASC" ? (
                        <HiSortAscending size={20} />
                      ) : (
                        <HiSortDescending size={20} />
                      )
                    ) : null}
                  </th>
                  <th onClick={() => sorting("TDS")}>
                    <span>TDS</span>
                    <br />
                    {iconPosition === "TDS" ? (
                      order === "ASC" ? (
                        <HiSortAscending size={20} />
                      ) : (
                        <HiSortDescending size={20} />
                      )
                    ) : null}
                  </th>
                  <th onClick={() => sorting("amountReceivable")}>
                    <span>Amount Receivable</span>
                    <br />
                    {iconPosition === "amountReceivable" ? (
                      order === "ASC" ? (
                        <HiSortAscending size={20} />
                      ) : (
                        <HiSortDescending size={20} />
                      )
                    ) : null}
                  </th>
                  <th>
                    <span>Update Date</span>
                  </th>
                  <th>
                    <span>Status</span>
                  </th>
                  <th onClick={() => sorting("amountReceived")}>
                    <span>Amount Received</span>
                    <br />
                    {iconPosition === "amountReceived" ? (
                      order === "ASC" ? (
                        <HiSortAscending size={20} />
                      ) : (
                        <HiSortDescending size={20} />
                      )
                    ) : null}
                  </th>
                  {/* Add more spans as per your data */}
                </tr>
              </thead>
              <thead>
                <tr>
                  <th></th>
                  <th>
                    <label htmlFor="fromDate">From:</label>
                    <br />
                    <input
                      id="fromDate"
                      type="date"
                      value={moment(filter.fromInvoiceDate).format(
                        "YYYY-MM-DD"
                      )}
                      onChange={(e) =>
                        setFilter({
                          ...filter,
                          fromInvoiceDate: moment(e.target.value).format(
                            "YYYY-MM-DD"
                          ),
                        })
                      }
                    />
                    <br />
                    <label htmlFor="toDate">To:</label>
                    <br />
                    <input
                      id="toDate"
                      type="date"
                      value={moment(filter.toInvoiceDate).format("YYYY-MM-DD")}
                      onChange={(e) =>
                        setFilter({
                          ...filter,
                          toInvoiceDate: moment(e.target.value).format(
                            "YYYY-MM-DD"
                          ),
                        })
                      }
                    />
                  </th>
                  <th>
                    <input
                      type="number"
                      value={filter.invoiceNumberFilter}
                      onChange={(e) =>
                        setFilter({
                          ...filter,
                          invoiceNumberFilter: e.target.value,
                        })
                      }
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      value={filter.billedToFilter}
                      onChange={(e) =>
                        setFilter({ ...filter, billedToFilter: e.target.value })
                      }
                    />
                  </th>
                  <th>
                    <label htmlFor="amountLessThan">Less than:</label>
                    <input
                      type="number"
                      id="amountLessThan"
                      value={filter.amountFilterLessThan}
                      onChange={(e) =>
                        setFilter({
                          ...filter,
                          amountFilterLessThan: e.target.value,
                        })
                      }
                    />
                    <label htmlFor="amountMoreThan">More than:</label>
                    <input
                      type="number"
                      id="amountMoreThan"
                      value={filter.amountFilterMoreThan}
                      onChange={(e) =>
                        setFilter({
                          ...filter,
                          amountFilterMoreThan: e.target.value,
                        })
                      }
                    />
                  </th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>
                    <label htmlFor="lessThan">Less than:</label>
                    <input
                      type="number"
                      id="lessThan"
                      value={filter.amountReceivableFilterLessThan}
                      onChange={(e) =>
                        setFilter({
                          ...filter,
                          amountReceivableFilterLessThan: e.target.value,
                        })
                      }
                    />
                    <label htmlFor="moreThan">More than:</label>
                    <input
                      type="number"
                      id="moreThan"
                      value={filter.amountReceivableFilterMoreThan}
                      onChange={(e) =>
                        setFilter({
                          ...filter,
                          amountReceivableFilterMoreThan: e.target.value,
                        })
                      }
                    />
                  </th>
                  <th></th>
                  <th>
                    <select
                      value={filter.statusFilter}
                      onChange={(e) =>
                        setFilter({ ...filter, statusFilter: e.target.value })
                      }
                    >
                      <option value="">--Please choose an option--</option>
                      <option value="No payment">No payment</option>
                      <option value="Partial payment">Partial payment</option>
                      <option value="Full payment">Full payment</option>
                    </select>
                  </th>
                  <th>
                    <label htmlFor="lessThan">Less than:</label>
                    <input
                      type="number"
                      id="lessThan"
                      value={filter.amountReceivedFilterLessThan}
                      onChange={(e) =>
                        setFilter({
                          ...filter,
                          amountReceivedFilterLessThan: e.target.value,
                        })
                      }
                    />
                    <label htmlFor="moreThan">More than:</label>
                    <input
                      type="number"
                      id="moreThan"
                      value={filter.amountReceivedFilterMoreThan}
                      onChange={(e) =>
                        setFilter({
                          ...filter,
                          amountReceivedFilterMoreThan: e.target.value,
                        })
                      }
                    />
                  </th>

                  {/* Add more table headings as per your data */}
                </tr>
              </thead>

              <tbody>
                {filteredInvoices.map((item, index) => (
                  <tr key={item.id} onClick={(e) => handleClick(item.id)}>
                    <td>{index + 1}</td>
                    <td>
                      {moment(item.invoiceDate)
                        .tz("Asia/Kolkata")
                        .format("DD/MM/YYYY")}
                    </td>
                    <td>{item.invoiceNumber}</td>
                    <td>{item.billedTo}</td>
                    <td>{item.amount}</td>
                    <td>{item.SGST}</td>
                    <td>{item.CGST}</td>
                    <td>{item.IGST}</td>
                    <td>{item.total}</td>
                    <td>{item.TDS}</td>
                    <td>{item.amountReceivable}</td>
                    <td>
                      {item.updateDate === null
                        ? "null"
                        : moment(item.updateDate)
                            .tz("Asia/Kolkata")
                            .format("DD/MM/YYYY")}
                    </td>
                    <td>{item.status}</td>
                    <td>
                      {item.amountReceived === null ? 0 : item.amountReceived}
                    </td>
                    {/* Add more table cells as per your data */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
