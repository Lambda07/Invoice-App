import React, { useState, useEffect, useRef } from "react";

import axios from "axios";
import "./Form2.css";
const Form2 = ({
  setCompany,
  currentDate,
  selectedLender,
  setSelectedLender,
  lenders,
  setLenders,
  sac,
  setSac,
  typeOfInvoice,
  setTypeOfInvoice,
  setCurrentDate,
  data,
  setData,
  rowData,
  setRowData,
  irate,
  setirate,
  amount,
  setamount,
  termname,
  settermname,
  companies,
  setCompanies,
  selectedCompany,
  setSelectedCompany,
  numberOfInvoices,
  setismaharastra,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [lenderSearchTerm, setLenderSearchTerm] = useState("");
  const [lenderSearchTerm2, setLenderSearchTerm2] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [showLenderDropdown, setShowLenderDropdown] = useState(false);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [attachment, setAttachment] = useState(null);
  const dropdownRef = useRef(null);
  const [selectedSalutation, setSelectedSalutation] = useState("Sir"); // Default salutation
  const isSir = true;
  const handleSalutationChange = (e) => {
    console.log(e.target.value);
    setSelectedSalutation(e.target.value);
  };
  const handleFocus = (input) => {
    setInputFocused(input); // Set the currently focused input
  };

  const handleBlur = () => {
    setInputFocused(null); // Reset currently focused input when blurred
  };
  const handleRecipientEmailChange = (e) => {
    setRecipientEmail(e.target.value);
  };
  const handleEmailSubjectChange = (e) => {
    setEmailSubject(e.target.value);
  };

  const handleEmailBodyChange = (e) => {
    setEmailBody(e.target.value);
  };

  const handleAttachmentChange = (e) => {
    setAttachment(e.target.files[0]);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRowData((prevData) => ({
      ...prevData,
      [name]: value,
      // Reset r to an empty array when lt is changed
      r: name === "lt" ? [] : prevData.r,
    }));
  };
  const handleLenderInputClick = (e) => {
    setShowLenderDropdown(true);
    setShowCompanyDropdown(false);
  };

  const handleCompanyInputClick = () => {
    setShowCompanyDropdown(true);
    setShowLenderDropdown(false);
  };
  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };

  const handleDateChange = (e) => {
    setCurrentDate(e.target.value);
  };

  const handleLenderChange = (e) => {
    setLenders(e.target.value);
  };
  const handleAmountChange = (e) => {
    setamount(e.target.value);
  };
  const handlenameChange = (e) => {
    settermname(e.target.value);
  };
  const handleiChange = (e) => {
    setirate(e.target.value);
  };
  const handleRChange = (index, value) => {
    setRowData((prevData) => ({
      ...prevData,
      r: [...prevData.r.slice(0, index), value, ...prevData.r.slice(index + 1)],
    }));
  };
  const handleSendEmail = async (e) => {
    e.preventDefault();

    // Prepare email data with only selected salutation
    const formData = new FormData();
    formData.append("recipientEmail", recipientEmail);
    formData.append("subject", emailSubject);
    formData.append("body", selectedSalutation); // Only include selected salutation
    formData.append("numberOfInvoice", Number(numberOfInvoices) + 1);
    formData.append("lenderName", selectedLender.name);
    formData.append("borrowerName", selectedCompany.clientName);
    if (attachment) {
      formData.append("attachment", attachment);
    }

    try {
      // Send email using axios or your preferred method
      const response = await axios.post("/send-email", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Email sent successfully:", response.data);
      // Reset form fields after sending email
      setRecipientEmail("");
      setEmailSubject("");
      setAttachment(null);
      alert("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Error sending email. Please try again later.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled before submitting
    if (Object.values(rowData).some((val) => val === "")) {
      alert("All fields are required");
      return;
    }
    setData([...data, rowData]);
    setRowData({
      tof: "",
      lt: "",
      t: "",
      d: "",
      r: [],
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/client/getAllClients");
        setCompanies(response.data.clients);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("/client/getAllLenders");
        setLenders(data.lenders);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLenderDropdown(false);
        setShowCompanyDropdown(false);
      }
    }

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    if (company.state.toLowerCase() !== "maharashtra") {
      setismaharastra(false);
    } else {
      setismaharastra(true);
    }
    setSearchTerm(company.clientName); // Set the selected company to the search term
    setShowCompanyDropdown(false); // Hide company dropdown after selection
  };

  // Filter companies based on search term
  const filteredCompanies = companies.filter((company) =>
    company.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLenders = lenders.filter((lender) =>
    lender.name.toLowerCase().includes(lenderSearchTerm.toLowerCase())
  );

  const handleLenderSelect = (lender) => {
    setSelectedLender(lender);
    setLenderSearchTerm(lender.name); // Set the selected lender to the search term
    setShowLenderDropdown(false); // Hide lender dropdown after selection
  };

  function getFormattedDate(currDate) {
    const dateObj = new Date(currDate);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <>
      <div className="form-container">
        <div className="form-section">
          <div className="input-group">
            <h4 className="form-heading">Select Date:</h4>
            <input
              type="date"
              value={getFormattedDate(currentDate)}
              id="date"
              onChange={(e) => setCurrentDate(e.target.value)}
              style={{ fontSize: "16px" }}
            />
          </div>
          <h2 className="form-heading">Select a company:</h2>
          <div className="search-container">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={handleCompanyInputClick}
              placeholder="Search company..."
              className="search-input"
            />
            {showCompanyDropdown && (
              <ul className="search-results">
                {filteredCompanies.map((company) => (
                  <li
                    key={company.id}
                    onClick={() => handleCompanySelect(company)}
                    className="result-item"
                    style={{ fontSize: "18px" }} // Adjust font size here
                  >
                    {company.clientName}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="form-section">
          <h4 className="form-heading">Select a lender:</h4>
          <div className="search-container">
            <input
              type="text"
              value={lenderSearchTerm}
              onChange={(e) => setLenderSearchTerm(e.target.value)}
              onClick={handleLenderInputClick}
              placeholder="Search lender..."
              className="search-input"
            />
            {showLenderDropdown && (
              <ul className="search-results">
                {filteredLenders.map((company) => (
                  <li
                    key={company.id}
                    onClick={() => handleLenderSelect(company)}
                    className="result-item"
                    style={{ fontSize: "18px" }} // Adjust font size here
                  >
                    {company.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <h4 htmlFor="amount" style={{}}>
                Amount:
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="Enter amount"
                  required
                />
              </h4>
            </div>
            <div className="input-group">
              <h4
                htmlFor="invoiceType"
                // style={{ "font-size": "20px", "font-weight": "bold" }}
              >
                Invoice Type:{" "}
              </h4>
              <h5 style={{ display: "block", marginLeft: "23px" }}>
                <select
                  id="invoiceType"
                  value={typeOfInvoice}
                  onChange={(e) => setTypeOfInvoice(e.target.value)}
                >
                  <option value="Invoice">Invoice</option>
                  <option value="Proforma">Proforma</option>
                  <option value="Credit Note">Credit Note</option>
                </select>
              </h5>
            </div>
            <div className="input-group">
              <h4
                htmlFor="sac"
                // style={{ "font-size": "20px", "font-weight": "bold" }}
              >
                SAC:
              </h4>
              <input
                type="text"
                id="sac"
                value={sac}
                onChange={(e) => setSac(e.target.value)}
                placeholder="Enter SAC"
                required
              />
            </div>
          </form>
        </div>

        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <h4
                htmlFor="loanType"
                // style={{ "font-size": "20px", "font-weight": "bold" }}
              >
                Type of Loan:
              </h4>
              <input
                type="text"
                id="loanType"
                value={termname}
                onChange={handlenameChange}
                placeholder="Enter loan type"
                required
              />
            </div>
            <div className="input-group">
              <h4
                htmlFor="fees"
                // style={{ "font-size": "20px", "font-weight": "bold" }}
              >
                Fees:
                <input
                  type="number"
                  id="fees"
                  value={irate}
                  onChange={handleiChange}
                  placeholder="Enter interest rate"
                  required
                />{" "}
              </h4>
            </div>
          </form>
        </div>
        <hr></hr>
        <div className="email-form-container">
          <h3>Send Email</h3>
          <form
            action="/send-email"
            enctype="multipart/form-data"
            onSubmit={handleSendEmail}
          >
            <br></br>
            <div className="input-group">
              <h4 htmlFor="recipientEmail">Recipient Email:</h4>
              <input
                type="email"
                id="recipientEmail"
                value={recipientEmail}
                onChange={handleRecipientEmailChange}
                placeholder="Enter recipient email"
                required
              />
            </div>
            {/* <div className="input-group">
            <label htmlFor="emailSubject">Subject:</label>
            <input
              type="text"
              id="emailSubject"
              value={emailSubject}
              onChange={handleEmailSubjectChange}
              placeholder="Enter email subject"
              required
            />
          </div> */}
            {/* <div className="input-group">
            <label htmlFor="emailBody">Body:</label>
            <textarea
              id="emailBody"
              value={emailBody}
              onChange={handleEmailBodyChange}
              placeholder="Enter email body"
              required
            />
          </div> */}
            <div className="input-group">
              <h4 htmlFor="salutation">Salutation: </h4>
              <h6>
                <select
                  style={{ marginLeft: "23px" }}
                  id="salutation"
                  value={selectedSalutation}
                  onChange={handleSalutationChange}
                >
                  <option value="Sir">Dear Sir</option>
                  <option value="Madam">Dear Madam</option>
                </select>
              </h6>
            </div>
            <div className="input-group">
              <h4 htmlFor="attachment">Attachment:</h4>
              <h6>
                <input
                  type="file"
                  id="attachment"
                  onChange={handleAttachmentChange}
                />
              </h6>
            </div>
            <button type="submit">Send Email</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form2;
