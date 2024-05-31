import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../axios";
import "./updateEntity.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../../header/Header";

function UpdateLender() {
  const navigate = useNavigate();

  const url = new URL(window.location.href);
  const id = url.pathname.split("/").pop();
  const [lenderData, setLenderData] = useState({});
  const [formData, setFormData] = useState({
    name: lenderData.name,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`/client/getSingleLender/${id}`);
        setLenderData(data.lender[0]);
        setFormData({
          name: data.lender[0].name,
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
      const { data } = await axios.patch("/client/updateLender", {
        id: Number(id),
        name: formData.name,
      });
      toast.success("Lender updated successfully");
    } catch (error) {
      toast.error("Error updating client");
      console.log(error);
    }
  };

  const handleDelete = async () => {
    var result = window.confirm("Want to delete?");
    if (result) {
      try {
        const { data } = await axios.delete(`/client/deleteLender/${id}`);
        toast.success("Lender deleted successfully");
        navigate("/lenders");
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
        <h4 className="form-title">Update Lender {lenderData.name}</h4>
        <form onSubmit={handleSubmit}>
          <label className="field-label">
            Lender name:
            <input
              className="field-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit" className="submit-button">
            Update Lender
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="delete-button"
          >
            Delete Lender
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateLender;
