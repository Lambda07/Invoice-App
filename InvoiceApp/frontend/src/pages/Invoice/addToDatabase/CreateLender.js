import React, { useState, useEffect } from "react";
import "./Form.css"; // import your CSS file for styling
import axios from "axios";
import "../../../axios";
import { toast } from "react-toastify";
import Header from "../../../header/Header";
import { useNavigate } from "react-router-dom";

const CreateLender = () => {
  const navigate = useNavigate();

  const [lenders, setLenders] = useState([
    {
      id: 11,
      name: "Mangal Finance Limited",
    },
  ]);

  const [filter, setFilter] = useState({
    lenderNameFiler: "",
  });

  const [filteredLenders, setFilteredLenders] = useState([
    {
      id: 11,
      name: "Mangal Finance Limited",
    },
  ]);

  const [formData, setFormData] = useState({
    LenderName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Do something with the form data, for example, send it to a server
    console.log(formData);
    try {
      const { data } = await axios.post(`/client/addLender`, {
        name: formData.LenderName,
      });

      toast.success("Client added successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error adding client");
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("/client/getAllLenders");
        setLenders(data.lenders);
        setFilteredLenders(data.lenders); // Set initially to the same list
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = lenders.filter((lender) => {
      const isLenderNameMatch = lender.name
        .toLowerCase()
        .includes(filter.lenderNameFiler.toLowerCase());

      return isLenderNameMatch;
    });

    setFilteredLenders(filtered);
  }, [lenders, filter]);

  const handleClick = (id) => {
    navigate(`/lenders/${id}`);
  };

  return (
    <>
      <Header />
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h5 htmlFor="LenderName">Name Of Lender:</h5>
            <input
              type="text"
              id="LenderName"
              name="LenderName"
              value={formData.LenderName}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="filterClients" style={{ maxWidth: "60%" }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>
                  <span>Sr. no</span>
                </th>
                <th>
                  <span>Lender name</span>
                </th>

                {/* Add more spans as per your data */}
              </tr>
            </thead>
            <thead>
              <tr>
                <th></th>
                <th>
                  <input
                    type="text"
                    id="lenderName"
                    style={{ width: "60%", padding: "5px" }}
                    value={filter.lenderNameFiler}
                    onChange={(e) =>
                      setFilter({ ...filter, lenderNameFiler: e.target.value })
                    }
                  />
                </th>
                {/* Add more table headings as per your data */}
              </tr>
            </thead>
            <tbody>
              {filteredLenders.map((item, index) => (
                <tr key={item.id} onClick={(e) => handleClick(item.id)}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  {/* Add more table cells as per your data */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CreateLender;
