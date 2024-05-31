import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../axios";
import "./updateEntity.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../../header/Header";

function UpdateClient() {
  const navigate = useNavigate();

  const url = new URL(window.location.href);
  const id = url.pathname.split("/").pop();
  const [clientData, setClientData] = useState({});
  const [formData, setFormData] = useState({
    clientName: clientData.clientName,
    address: clientData.address,
    gstNumber: clientData.GSTNo,
    state: clientData.state,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`/client/getSingleClient/${id}`);
        setClientData(data.client[0]);
        setFormData({
          clientName: data.client[0].clientName,
          address: data.client[0].address,
          gstNumber: data.client[0].GSTNo,
          state: data.client[0].state,
        });
        setLoading(false);
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
      const { data } = await axios.patch("/client/updateClient", {
        id: Number(id),
        clientName: formData.clientName,
        address: formData.address,
        gstNumber: formData.gstNumber,
        state: formData.state,
      });
      toast.success("Client updated successfully");
    } catch (error) {
      toast.error("Error updating client");
      console.log(error);
    }
  };

  const handleDelete = async () => {
    var result = window.confirm("Want to delete?");
    if (result) {
      try {
        const { data } = await axios.delete(`/client/deleteClient/${id}`);
        toast.success("Client deleted successfully");
        navigate("/clients");
      } catch (error) {
        toast.error("Error deleting client");
        console.log(error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="update-invoice-container">
        <h4 className="form-title">Update Client {clientData.clientName}</h4>
        <form onSubmit={handleSubmit}>
          <label className="field-label">
            Client name:
            <input
              className="field-input"
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
            />
          </label>
          <br />
          <label className="field-label">
            Address:
            <input
              className="field-input"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </label>
          <br />
          <label className="field-label">
            GST Number:
            <input
              className="field-input"
              type="text"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleChange}
            />
          </label>
          <br />
          <label className="field-label">
            State:
            <input
              className="field-input"
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </label>
          <br />

          <button type="submit" className="submit-button">
            Update Client
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="delete-button"
          >
            Delete Client
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateClient;
