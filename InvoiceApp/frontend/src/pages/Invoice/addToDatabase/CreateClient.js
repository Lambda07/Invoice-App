import React, { useState, useEffect } from "react";
import "./Form.css"; // import your CSS file for styling
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../../../header/Header";
import { useNavigate } from "react-router-dom";

const states = {
  AN: "Andaman and Nicobar Islands",
  AP: "Andhra Pradesh",
  AR: "Arunachal Pradesh",
  AS: "Assam",
  BR: "Bihar",
  CG: "Chandigarh",
  CH: "Chhattisgarh",
  DN: "Dadra and Nagar Haveli",
  DD: "Daman and Diu",
  DL: "Delhi",
  GA: "Goa",
  GJ: "Gujarat",
  HR: "Haryana",
  HP: "Himachal Pradesh",
  JK: "Jammu and Kashmir",
  JH: "Jharkhand",
  KA: "Karnataka",
  KL: "Kerala",
  LA: "Ladakh",
  LD: "Lakshadweep",
  MP: "Madhya Pradesh",
  MH: "Maharashtra",
  MN: "Manipur",
  ML: "Meghalaya",
  MZ: "Mizoram",
  NL: "Nagaland",
  OR: "Odisha",
  PY: "Puducherry",
  PB: "Punjab",
  RJ: "Rajasthan",
  SK: "Sikkim",
  TN: "Tamil Nadu",
  TS: "Telangana",
  TR: "Tripura",
  UP: "Uttar Pradesh",
  UK: "Uttarakhand",
  WB: "West Bengal",
};

const CreateClient = () => {
  const navigate = useNavigate();

  const [clients, setClients] = useState([
    {
      id: 11,
      clientName: "Mangal Finance Limited",
      address: "Mumbai",
      GSTNo: "27AABCM1234D1Z5",
      state: "Maharashtra",
    },
  ]);

  const [filter, setFilter] = useState({
    clientNameFilter: "",
    gstNumberFilter: "",
    stateFilter: "",
  });

  const [filteredClients, setFilteredClients] = useState([
    {
      id: 11,
      clientName: "Mangal Finance Limited",
      address: "Mumbai",
      GSTNo: "27AABCM1234D1Z5",
      state: "Maharashtra",
    },
  ]);

  const [formData, setFormData] = useState({
    ClientName: "",
    Address: "",
    GST: "",
    state: "",
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
    if (formData.GST.length !== 15) {
      toast.error("GST number must be 15 characters long");
      return;
    }
    try {
      const { data } = await axios.post(`/client/addClient`, {
        name: formData.ClientName,
        address: formData.Address,
        gst: formData.GST,
        state: formData.state,
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
        const { data } = await axios.get("/client/getAllClients");
        setClients(data.clients);
        setFilteredClients(data.clients); // Set initially to the same list
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = clients.filter((client) => {
      const isClientNameMatch = client.clientName
        .toLowerCase()
        .includes(filter.clientNameFilter.toLowerCase());

      const isGstNumberMatch = client.GSTNo.includes(filter.gstNumberFilter);

      const isStateMatch = client.state
        .toLowerCase()
        .includes(filter.stateFilter.toLowerCase());

      return isClientNameMatch && isGstNumberMatch && isStateMatch;
    });

    setFilteredClients(filtered);
  }, [clients, filter]);

  const handleClick = (id) => {
    navigate(`/clients/${id}`);
  };

  // Dropdown options for states
  const stateOptions = Object.entries(states).map(([code, name]) => ({
    code,
    name,
  }));

  return (
    <>
      <Header />
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h5 htmlFor="ClientName">Name Of Client</h5>
            <input
              type="text"
              id="ClientName"
              name="ClientName"
              value={formData.ClientName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <h5 htmlFor="Address">Address:</h5>
            <input
              type="text"
              id="Address"
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <h5 htmlFor="GST">GST:</h5>
            <input
              type="text"
              id="GST"
              name="GST"
              value={formData.GST}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <h5 htmlFor="state">State:</h5>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              style={{ padding: "4%", fontSize: "1rem" }}
              required
            >
              <option value="">Select State</option>
              {stateOptions.map((option) => (
                <option key={option.code} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="filterClients">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>
                  <span>Sr. no</span>
                </th>
                <th>
                  <span>Client name</span>
                </th>
                <th>
                  <span>Address</span>
                </th>
                <th>
                  <span>GST</span>
                </th>
                <th>
                  <span>State</span>
                </th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th></th>
                <th>
                  <input
                    type="text"
                    id="clientName"
                    style={{ width: "80%", padding: "5px" }}
                    value={filter.clientNameFilter}
                    onChange={(e) =>
                      setFilter({ ...filter, clientNameFilter: e.target.value })
                    }
                  />
                </th>
                <th></th>
                <th>
                  <input
                    type="text"
                    id="gstNumber"
                    style={{ width: "80%", padding: "5px" }}
                    value={filter.gstNumberFilter}
                    onChange={(e) =>
                      setFilter({
                        ...filter,
                        gstNumberFilter: e.target.value,
                      })
                    }
                  />
                </th>
                <th>
                  <input
                    type="text"
                    id="state"
                    style={{ width: "80%", padding: "5px" }}
                    value={filter.stateFilter}
                    onChange={(e) =>
                      setFilter({
                        ...filter,
                        stateFilter: e.target.value,
                      })
                    }
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((item, index) => (
                <tr key={item.id} onClick={() => handleClick(item.id)}>
                  <td>{index + 1}</td>
                  <td>{item.clientName}</td>
                  <td>{item.address}</td>
                  <td>{item.GSTNo}</td>
                  <td>{item.state}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CreateClient;
