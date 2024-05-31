import React, { useEffect, useState } from "react";
import axios from "axios";
import "../axios";
import "./PastInvoice.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../header/Header";

function PastInvoice() {
  const navigate = useNavigate();
  const url = new URL(window.location.href);
  const id = url.pathname.split("/").pop();
  const [invoiceData, setInvoiceData] = useState({});
  const [formData, setFormData] = useState({
    status: invoiceData.status,
    amountReceived: invoiceData.amountReceived,
    billedTo: invoiceData.billedTo,
    amountReceivable: invoiceData.amountReceivable,
    amount: invoiceData.amount,
    total: invoiceData.total,
    TDS: invoiceData.TDS,
    CGST: invoiceData.CGST,
    IGST: invoiceData.IGST,
    SGST: invoiceData.SGST,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.post("/invoice/getSingleInvoice", {
          id: Number(id),
        });
        setInvoiceData(data.invoice);
        setLoading(false);
        setFormData({
          status: data.invoice.status,
          amountReceived: data.invoice.amountReceived,
          billedTo: data.invoice.billedTo,
          amountReceivable: data.invoice.amountReceivable,
          amount: data.invoice.amount,
          total: data.invoice.total,
          TDS: data.invoice.TDS,
          CGST: data.invoice.CGST,
          IGST: data.invoice.IGST,
          SGST: data.invoice.SGST,
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.status) {
        toast.error("Please fill in the form");
        return;
      }
      if (formData.amountReceived > formData.amountReceivable) {
        toast.error("Amount received cannot be greater than amount receivable");
        return;
      }
      const { data } = await axios.patch("/invoice/updateInvoice", {
        id: Number(id),
        status: formData.status,
        amountReceived: formData.amountReceived,
        billedTo: formData.billedTo,
        amountReceivable: formData.amountReceivable,
        amount: formData.amount,
        total: formData.total,
        TDS: formData.TDS,
        CGST: formData.CGST,
        IGST: formData.IGST,
        SGST: formData.SGST,
      });
      toast.success("Invoice updated successfully.");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
    console.log("Updated Invoice:", formData);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete("/invoice/deleteInvoice", {
        data: {
          id: Number(id),
        },
      });
      toast.success("Invoice deleted successfully.");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    navigate(`/createInvoice/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="update-invoice-container">
        <div
          style={{
            display: "flex",
            alignItems: "end",
          }}
        >
          <h4 className="form-title">
            Update Invoice {invoiceData.invoiceNumber}
          </h4>
        </div>
        <button style={{ backgroundColor: "green" }} onClick={handleSubmit}>
          Save
        </button>
        <button
          style={{
            marginLeft: "10px",
            marginBottom: "10px",
            backgroundColor: "#ee2c2c",
          }}
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          style={{
            marginLeft: "10px",
            marginBottom: "10px",
            backgroundColor: "#fcc101",
          }}
          onClick={handleUpdate}
        >
          Update
        </button>
        <form onSubmit={handleSubmit}>
          <label className="field-label">
            Status:
            <select
              className="field-input"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="">--Please choose an option--</option>
              <option value="No Payment">No payment</option>
              <option value="Partial Payment">Partial payment</option>
              <option value="Full Payment">Full payment</option>
            </select>
          </label>
          <label className="field-label">
            Amount Received:
            <input
              className="field-input"
              style={{ width: "100%", padding: "8px" }}
              type="number"
              name="amountReceived"
              value={formData.amountReceived}
              onChange={handleChange}
            />
          </label>
          <label className="field-label">
            Billed To:
            <input
              className="field-input"
              style={{ width: "100%", padding: "8px" }}
              type="text"
              name="billedTo"
              value={formData.billedTo}
              onChange={handleChange}
            />
          </label>
          <label className="field-label">
            Amount Receivable:
            <input
              className="field-input"
              style={{ width: "100%", padding: "8px" }}
              type="number"
              name="amountReceivable"
              value={formData.amountReceivable}
              onChange={handleChange}
            />
          </label>
          <label className="field-label">
            Amount:
            <input
              className="field-input"
              style={{ width: "100%", padding: "8px" }}
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </label>
          <label className="field-label">
            Total:
            <input
              className="field-input"
              style={{ width: "100%", padding: "8px" }}
              type="number"
              name="total"
              value={formData.total}
              onChange={handleChange}
            />
          </label>
          <label className="field-label">
            TDS:
            <input
              className="field-input"
              style={{ width: "100%", padding: "8px" }}
              type="number"
              name="TDS"
              value={formData.TDS}
              onChange={handleChange}
            />
          </label>
          <label className="field-label">
            CGST:
            <input
              className="field-input"
              style={{ width: "100%", padding: "8px" }}
              type="number"
              name="CGST"
              value={formData.CGST}
              onChange={handleChange}
            />
          </label>
          <label className="field-label">
            SGST:
            <input
              className="field-input"
              style={{ width: "100%", padding: "8px" }}
              type="number"
              name="SGST"
              value={formData.SGST}
              onChange={handleChange}
            />
          </label>
          <label className="field-label">
            IGST:
            <input
              className="field-input"
              style={{ width: "100%", padding: "8px" }}
              type="number"
              name="IGST"
              value={formData.IGST}
              onChange={handleChange}
            />
          </label>

          <button type="submit" className="submit-button">
            Save Invoice
          </button>
          <button className="delete-button" onClick={handleDelete}>
            Delete Invoice
          </button>
          <button className="update-button" onClick={handleUpdate}>
            Update Invoice
          </button>
        </form>
      </div>
    </>
  );
}

export default PastInvoice;
