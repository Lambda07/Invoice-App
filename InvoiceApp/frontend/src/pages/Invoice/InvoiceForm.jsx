import { Slide, toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Form2/myc.css";
import "./Form2/style.css";
import "./Form2/Form2.css";
import "./App.css";
import Form2 from "./Form2/Form2";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import Preview from "./Form2/Preview";
function InvoiceForm() {
  function getFormattedDate() {
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const navigate = useNavigate();
  const [typeOfInvoice, setTypeOfInvoice] = useState("Invoice");
  const [sac, setSac] = useState("997156");

  const [company, setCompany] = useState("");
  const [currentDate, setCurrentDate] = useState(getFormattedDate());
  const [data, setData] = useState([]);
  const [rowData, setRowData] = useState({
    tof: "",
    lt: "",
    t: "",
    d: 0,
    r: [],
  });
  const [irate, setirate] = useState(0);
  const [amount, setamount] = useState(1);
  const [termname, settermname] = useState("");
  const [termvalue, settermvalue] = useState(0);
  // State to store the selected company
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedLender, setSelectedLender] = useState(null);
  // State to store the list of companies fetched from the backend
  const [numberOfInvoices, setNumberOfInvoices] = useState(4);
  const [ismaharastra, setismaharastra] = useState(true);
  const [isUpdateInvoice, setIsUpdateInvoice] = useState(false);
  const [invoiceId, setInvoiceId] = useState(-1);
  const [companies, setCompanies] = useState([
    // {
    //   id: 1,
    //   clientName: "Achiievers Finance India (P) Ltd",
    //   address:
    //     "32/A, Diamond Harbour Road, Sakherbazar, Kolkata, West Bengal - 700008",
    //   GSTNo: "GST No - 19AAACI6565M2ZZ",
    // },
    // {
    //   id: 2,
    //   clientName: "Mangal Corporation India (P) Ltd",
    //   address: "42/C, Emrald Port Road, Bhaji market, Kalyan, Assam - 421201",
    //   GSTNo: "GST No - 19AAACI65906ASQ",
    // },
  ]);

  const [lenders, setLenders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("/invoice/getNumberOfInvoice");
        setNumberOfInvoices(data.number);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="App">
        <div style={{ display: "flex" }}>
          <div style={{ flex: "row", marginRight: "400px" }}>
            <Form2
              setCompany={setCompany}
              currentDate={currentDate}
              selectedLender={selectedLender}
              setSelectedLender={setSelectedLender}
              lenders={lenders}
              setLenders={setLenders}
              sac={sac}
              setSac={setSac}
              typeOfInvoice={typeOfInvoice}
              setTypeOfInvoice={setTypeOfInvoice}
              setCurrentDate={setCurrentDate}
              data={data}
              setData={setData}
              rowData={rowData}
              setRowData={setRowData}
              irate={irate}
              setirate={setirate}
              amount={amount}
              setamount={setamount}
              termname={termname}
              settermname={settermname}
              termvalue={termvalue}
              settermvalue={settermvalue}
              companies={companies}
              setCompanies={setCompanies}
              selectedCompany={selectedCompany}
              setSelectedCompany={setSelectedCompany}
              numberOfInvoices={numberOfInvoices}
              setismaharastra={setismaharastra}
            />
            {/* <FormComponent/> */}
          </div>
          <div style={{ flex: 1, border: "2px solid black" }}>
            <Preview
              company={company}
              setCompany={setCompany}
              currentDate={currentDate}
              selectedLender={selectedLender}
              setSelectedLender={setSelectedLender}
              lenders={lenders}
              setLenders={setLenders}
              sac={sac}
              setSac={setSac}
              typeOfInvoice={typeOfInvoice}
              setTypeOfInvoice={setTypeOfInvoice}
              setCurrentDate={setCurrentDate}
              data={data}
              setData={setData}
              rowData={rowData}
              setRowData={setRowData}
              irate={irate}
              setirate={setirate}
              amount={amount}
              setamount={setamount}
              termname={termname}
              settermname={settermname}
              termvalue={termvalue}
              settermvalue={settermvalue}
              companies={companies}
              setCompanies={setCompanies}
              selectedCompany={selectedCompany}
              setSelectedCompany={setSelectedCompany}
              numberOfInvoices={numberOfInvoices}
              ismaharastra={ismaharastra}
              setismaharastra={setismaharastra}
              isUpdateInvoice={isUpdateInvoice}
              invoiceId={invoiceId}
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default InvoiceForm;
