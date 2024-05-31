import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import "../../../axios";
import html2pdf from "html2pdf.js";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { saveAs } from "file-saver"; // Import saveAs function
import { currency } from "currency-in-words"; // Import currency function
import { convert } from "currency-in-words";
const fmt = require("indian-number-format");
const Preview = ({
  companies,
  company,
  currentDate,
  selectedLender,
  sac,
  typeOfInvoice,
  typeOfLoan,
  data,
  lenders,
  amount,
  irate,
  termname,
  termvalue,
  selectedCompany,
  setSelectedCompany,
  numberOfInvoices,
  ismaharastra,
  setismaharastra,
  isUpdateInvoice,
  invoiceId,
}) => {
  var converter = require("number-to-words");

  // State to store the selected company

  // State to store the list of companies fetched from the backend
  const navigate = useNavigate();
  const formatDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(date).toLocaleDateString("en-GB", options);
  };
  function fmtformat(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const calculateValue = () => {
    const value = 0.18 * parseFloat((amount * irate) / 100);
    return ismaharastra ? value / 2 : value;
  };
  const dValues = data.map((item) => {
    const parts = item.d.split(" ");
    if (parts[1] && parts[1].toLowerCase() === "years") {
      return { value: parseInt(parts[0]), unit: "years" };
    } else if (parts[1] && parts[1].toLowerCase() === "months") {
      return { value: parseInt(parts[0]), unit: "months" };
    }
    return { value: 0, unit: "" };
  });
  async function Export2Word() {
    const amountNew = parseFloat((amount * irate) / 100).toFixed(3);
    const total =
      parseFloat((amount * irate) / 100) +
      Math.round(0.18 * parseFloat((amount * irate) / 100));
    const tds = (0.1 * (amount * irate)) / 100;
    const amountReceive =
      (amount * irate) / 100 +
      Math.round((0.18 * (amount * irate)) / 100) -
      (0.1 * (amount * irate)) / 100;

    if (isUpdateInvoice === false) {
      try {
        const { data } = await axios.post(`/invoice/createInvoice`, {
          currentDate: currentDate,
          invoiceNumber: `${numberOfInvoices + 1}/23-24`,
          billedTo: selectedCompany.clientName || " ",
          amount: amountNew,
          SGST: ismaharastra ? 9 : 0,
          CGST: ismaharastra ? 9 : 0,
          IGST: ismaharastra ? 0 : 18,
          total: total,
          TDS: tds,
          amountReceivable: amountReceive,
          status: "No Payment",
          amountReceived: 0,
          lenderName: selectedLender.name || "",
          invoiceType: typeOfInvoice,
          sac: sac,
          typeOfLoan: termname,
          fees: irate,
          billedToAddress: selectedCompany.address,
          billedToGST: String(selectedCompany.GSTNo),
          isMaharashtra: ismaharastra,
        });
        toast.success("Invoice added to the database");
      } catch (error) {
        toast.error("Error adding invoice to the database");
        console.log(error);
      }
    } else {
      try {
        const { data } = await axios.patch("/invoice/updateInvoiceData", {
          id: Number(invoiceId),
          SGST: ismaharastra ? 9 : 0,
          CGST: ismaharastra ? 9 : 0,
          IGST: ismaharastra ? 0 : 18,
          total: total,
          TDS: tds,
          amountReceivable: amountReceive,
          billedTo: selectedCompany.clientName || " ",
          invoiceDate: getFormattedDate(currentDate),
          lenderName: selectedLender.name || " ",
          amount: amountNew,
          invoiceType: typeOfInvoice,
          sac: sac,
          typeOfLoan: termname,
          fees: irate,
          billedToAddress: selectedCompany.address || " ",
          billedToGST: selectedCompany.GSTNo,
          isMaharashtra: ismaharastra,
        });
        toast.success("Invoice updated successfully.");
      } catch (error) {
        console.log(error);
      }
    }

    var element = "exportContent";
    var filename = "Invoice";
    var preHtml =
      "<html xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Docx</title><style>table {border-collapse: collapse; width: 100%;} th, td {border: 1px solid black; padding: 8px; text-align: left;} </style></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml + document.getElementById(element).innerHTML + postHtml;
    var blob = new Blob(["\ufeff", html], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    // Specify link url
    var url = URL.createObjectURL(blob);
    // Specify file name
    filename = filename ? filename + ".doc" : "document.docx";
    // Create download link element
    var downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Create a link to the file
      downloadLink.href = url;
      // Setting the file name
      downloadLink.download = filename;
      //triggering the function
      downloadLink.click();
    }
    document.body.removeChild(downloadLink);
  }
  const Export2Excel = () => {
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Invoice");
    const wopts = {
      bookType: "xlsx",
      bookSST: false,
      type: "array",
      mimeType: "application/octet-stream",
    };
    const wbout = XLSX.write(wb, wopts);
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      `Invoice_${numberOfInvoices + 1}_23-24.xlsx`
    );
  };

  async function Export2PDF() {
    console.log(currentDate);
    const amountNew = parseFloat((amount * irate) / 100).toFixed(3);
    const total =
      parseFloat((amount * irate) / 100) +
      Math.round(0.18 * parseFloat((amount * irate) / 100));
    const tds = (0.1 * (amount * irate)) / 100;
    const amountReceive =
      (amount * irate) / 100 +
      Math.round((0.18 * (amount * irate)) / 100) -
      (0.1 * (amount * irate)) / 100;

    if (isUpdateInvoice === false) {
      try {
        const { data } = await axios.post(`/invoice/createInvoice`, {
          currentDate: currentDate,
          invoiceNumber: `${numberOfInvoices + 1}/23-24`,
          billedTo: selectedCompany.clientName || " ",
          amount: amountNew,
          SGST: ismaharastra ? 9 : 0,
          CGST: ismaharastra ? 9 : 0,
          IGST: ismaharastra ? 0 : 18,
          total: total,
          TDS: tds,
          amountReceivable: amountReceive,
          status: "No Payment",
          amountReceived: 0,
          lenderName: selectedLender.name || "",
          invoiceType: typeOfInvoice,
          sac: sac,
          typeOfLoan: termname,
          fees: irate,
          billedToAddress: selectedCompany.address,
          billedToGST: String(selectedCompany.GSTNo),
          isMaharashtra: ismaharastra,
        });
        toast.success("Invoice added to the database");
      } catch (error) {
        toast.error("Error adding invoice to the database");
        console.log(error);
      }
    } else {
      try {
        const { data } = await axios.patch("/invoice/updateInvoiceData", {
          id: Number(invoiceId),
          SGST: ismaharastra ? 9 : 0,
          CGST: ismaharastra ? 9 : 0,
          IGST: ismaharastra ? 0 : 18,
          total: total,
          TDS: tds,
          amountReceivable: amountReceive,
          billedTo: selectedCompany.clientName || " ",
          invoiceDate: getFormattedDate(currentDate),
          lenderName: selectedLender.name || " ",
          amount: amountNew,
          invoiceType: typeOfInvoice,
          sac: sac,
          typeOfLoan: termname,
          fees: irate,
          billedToAddress: selectedCompany.address || " ",
          billedToGST: selectedCompany.GSTNo,
          isMaharashtra: ismaharastra,
        });
        toast.success("Invoice updated successfully.");
      } catch (error) {
        console.log(error);
      }
    }

    var element = document.getElementById("exportContent");

    var filename = `FY 23-24 ${typeOfInvoice} No ${numberOfInvoices + 1}  ${
      selectedCompany.clientName
    }`;
    var options = {
      margin: 4,
      filename: filename + ".pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf(element, options);
  }
  const [excelData, setExcelData] = useState([]);

  // useEffect(() => {
  //   generateExcelData();
  // }, [selectedCompany, currentDate, numberOfInvoices]);

  const generateExcelData = () => {
    if (!selectedCompany) {
      // Handle the case where selectedCompany is null
      return;
    }
    const formattedDate = formatDate(new Date(currentDate));
    const invoiceNumber = `${numberOfInvoices + 1}/23-24`;
    const totalAmount = parseFloat((amount * irate) / 100).toFixed(3);
    const igstAmount = (0.18 * parseFloat((amount * irate) / 100)).toFixed(3);
    const totalBilledAmount = (
      parseFloat((amount * irate) / 100) +
      Math.round(0.18 * parseFloat((amount * irate) / 100))
    ).toFixed(3);

    const excelData = [
      ["Express Rupya Capital Advisors"],
      ["A/4 Chandrika Building, Shankar Lane, Kandivali West, Mumbai -400067"],
      ["Invoice"],
      [`DATE: ${formattedDate}`],
      [`INVOICE# '${numberOfInvoices + 1}/23-24`],
      ["PAN No. AVGPK3532Q"],
      ["GST No. 27AVGPK3532Q1Z4"],
      ["BILL TO:"],
      [selectedCompany.clientName],
      ...selectedCompany.address.split(",").map((part) => [part.trim()]),
      [selectedCompany.GSTNo],
      ["DESCRIPTION", "AMOUNT"],
      [
        `Service Charges For Introducing and Co-ordinating with ${selectedLender.name}`,
        amount,
      ],
      ["Fees", `@${irate}%`],
      [`SAC: ${sac}`],
      ["Total Invoice Amount(in Rupees)", totalAmount],
      ["Add: IGST @18%", igstAmount],
      ["TOTAL", totalBilledAmount],
      [
        "Amount Chargeable (in words)",
        `Rs ${converter.toWords(totalBilledAmount)} only`,
      ],
      ["TDS Working"],
      [
        "TDS 10% of Total Billed Amount (To be paid by you to Tax Authorities in FY 2023-24)",
        ((0.1 * (amount * irate)) / 100).toFixed(3),
      ],
      [
        "Amount Payable by you",
        (
          (amount * irate) / 100 +
          Math.round((0.18 * (amount * irate)) / 100) -
          (0.1 * (amount * irate)) / 100
        ).toFixed(3),
      ],
      ["For Express Rupya Capital Advisors"],
      ["Authorised Signatory"],
      ["Thank You For Your Business!"],
      ["Bank Details:"],
      ["Account Holder Name:", "Express Rupya Capital Advisors"],
      ["Bank Name:", "HDFC BANK LTD"],
      ["IFSC CODE:", "HDFC0000419"],
      ["A/c No:", "50200077517526"],
      ["Account Type:", "Current"],
    ];

    setExcelData(excelData);
  };
  const AddtoDatabase = async () => {
    const amountNew = parseFloat((amount * irate) / 100).toFixed(3);
    const total =
      parseFloat((amount * irate) / 100) +
      Math.round(0.18 * parseFloat((amount * irate) / 100));
    const tds = (0.1 * (amount * irate)) / 100;
    const amountReceive =
      (amount * irate) / 100 +
      Math.round((0.18 * (amount * irate)) / 100) -
      (0.1 * (amount * irate)) / 100;

    if (isUpdateInvoice === false) {
      try {
        const { data } = await axios.post(`/invoice/createInvoice`, {
          currentDate: currentDate,
          invoiceNumber: `${numberOfInvoices + 1}/23-24`,
          billedTo: selectedCompany.clientName || " ",
          amount: amountNew,
          SGST: ismaharastra ? 9 : 0,
          CGST: ismaharastra ? 9 : 0,
          IGST: ismaharastra ? 0 : 18,
          total: total,
          TDS: tds,
          amountReceivable: amountReceive,
          status: "No Payment",
          amountReceived: 0,
          lenderName: selectedLender.name || "",
          invoiceType: typeOfInvoice,
          sac: sac,
          typeOfLoan: termname,
          fees: irate,
          billedToAddress: selectedCompany.address,
          billedToGST: String(selectedCompany.GSTNo),
          isMaharashtra: ismaharastra,
        });
        toast.success("Invoice added to the database");
      } catch (error) {
        toast.error("Error adding invoice to the database");
        console.log(error);
      }
    } else {
      try {
        const { data } = await axios.patch("/invoice/updateInvoiceData", {
          id: Number(invoiceId),
          SGST: ismaharastra ? 9 : 0,
          CGST: ismaharastra ? 9 : 0,
          IGST: ismaharastra ? 0 : 18,
          total: total,
          TDS: tds,
          amountReceivable: amountReceive,
          billedTo: selectedCompany.clientName || " ",
          invoiceDate: getFormattedDate(currentDate),
          lenderName: selectedLender.name || " ",
          amount: amountNew,
          invoiceType: typeOfInvoice,
          sac: sac,
          typeOfLoan: termname,
          fees: irate,
          billedToAddress: selectedCompany.address || " ",
          billedToGST: selectedCompany.GSTNo,
          isMaharashtra: ismaharastra,
        });
        toast.success("Invoice updated successfully.");
      } catch (error) {
        console.log(error);
      }
    }

    navigate("/dashboard");
  };

  function getFormattedDate(date) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleCompanySelect = (event) => {
    const selectedCompanyId = parseInt(event.target.value);
    const selectedCompany = companies.find(
      (company) => company.id === selectedCompanyId
    );
    setSelectedCompany(selectedCompany);
  };
  console.log(termname);

  const handleCapitalize = (s) => {
    var words = s.split(" ");
    for (var a = 0; a < words.length; a++) {
      var w = words[a];
      words[a] = w[0].toUpperCase() + w.slice(1);
    }
    return words.join(" ");
  };

  return (
    <div style={{ width: "100%" }}>
      <div
        className="letterdata"
        id="exportContent"
        style={{
          width: "100%",
          marginTop: "5px",
          marginLeft: "2px",
        }}
      >
        <p style={{ textAlign: "center", fontSize: "10px" }}>
          <b>
            <strong>Express Rupya Capital Advisors</strong>
          </b>
          <br />
          <b>
            A/4 Chandrika Building, Shankar Lane, Kandivali West, Mumbai -400067
          </b>
          <hr style={{ borderColor: "black" }}></hr>
        </p>
        <p style={{ fontSize: "10px" }}>
          <b>{typeOfInvoice} </b>
        </p>
        <p style={{ textAlign: "right", marginRight: "45px" }}>
          <b>DATE: {formatDate(new Date(currentDate))} </b>
          <br></br>
          <b>INVOICE# '00{numberOfInvoices + 1}/23-24 </b>
          <br />
          <b>PAN No. AVGPK3532Q </b>
          <br></br>
          <b>GST No. 27AVGPK3532Q1Z4 </b>
        </p>
        <table
          border="0.1"
          style={{ width: "200px", position: "relative", left: "0px" }}
        >
          <tr>
            <td
              style={{
                backgroundColor: "black",
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
                paddingRight: "130px",
              }}
            >
              BILL TO:
            </td>
          </tr>
        </table>
        <p style={{ textAlign: "left", marginRight: "45px" }}>
          {selectedCompany && (
            <>
              <b style={{ fontSize: "10px" }}>{selectedCompany.clientName}</b>
              <br></br>
              {selectedCompany.address &&
                selectedCompany.address.split(",").map((part, index) => (
                  <b>
                    <span key={index} style={{ fontSize: "10px" }}>
                      {part.trim()}
                      <br />
                    </span>
                  </b>
                ))}
              <br />
              <b style={{ fontSize: "10px" }}>
                GST No - {selectedCompany.GSTNo}{" "}
              </b>
            </>
          )}
        </p>
        <b>
          <table
            style={{
              borderSpacing: "0",
              width: "full",
              paddingTop: "1px",
            }}
          >
            <tr>
              <th
                style={{
                  backgroundColor: "black",
                  color: "white",
                  textAlign: "left",
                  fontWeight: "bold",
                  paddingLeft: "5px",
                  paddingTop: "1px",
                }}
              >
                <p>DESCRIPTION</p>
              </th>
              <th
                style={{
                  backgroundColor: "black",
                  color: "white",
                  textAlign: "right",
                  fontWeight: "bold",
                  paddingRight: "80px",
                }}
              >
                <p>AMOUNT</p>
              </th>
            </tr>

            <tr>
              <td style={{ padding: "2px" }}>
                <p>
                  Service Charges For Introducing and Co-ordinating with{" "}
                  {(selectedLender && selectedLender.name) || ""}
                </p>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ textAlign: "left", paddingLeft: "13px" }}>
                    <p style={{ display: "inline-block" }}>{termname} </p>
                  </div>
                  <div style={{ textAlign: "right", paddingRight: "1px" }}>
                    <p style={{ display: "inline-block" }}>
                      {fmt.format(amount)}
                    </p>
                  </div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ textAlign: "left", paddingLeft: "13px" }}>
                    <p style={{ display: "inline-block" }}>Fees </p>
                  </div>
                  <div style={{ textAlign: "right", paddingRight: "4px" }}>
                    <p style={{ display: "inline-block" }}>@{irate}%</p>
                  </div>
                </div>
                <p style={{ textAlign: "left", paddingLeft: "px" }}>
                  <b> SAC: {sac} </b>
                </p>
              </td>
              <td>
                <p>{fmt.format((amount * irate) / 100)}</p>
              </td>
            </tr>

            <tr>
              <td
                class="move-up"
                style={{
                  textAlign: "left",
                  padding: "1px",
                  paddingTop: "2px",
                }}
              >
                <p style={{ paddingBottom: "7px" }}>
                  Total Invoice Amount(in Rupees)
                </p>
                {ismaharastra ? (
                  <div>
                    <p style={{ paddingBottom: "7px" }}>Add: SGST @9%</p>
                    <p style={{ paddingBottom: "7px" }}>Add: CGST @9%</p>
                  </div>
                ) : (
                  <p style={{ paddingBottom: "7px" }}>Add: IGST @18%</p>
                )}

                <p style={{ paddingBottom: "7px" }}>TOTAL</p>
                <p style={{ paddingBottom: "7px" }}>Round Off</p>
                <p style={{ paddingBottom: "7px" }}>Total Billed Amount</p>
              </td>
              <td style={{ verticalAlign: "top", paddingTop: "1px" }}>
                <p style={{ paddingTop: "1px" }}>
                  {fmt.format(parseFloat((amount * irate) / 100).toFixed(2))}
                </p>
                {/* {!ismaharastra && (
  <p>
    {fmt.format(
      (0.18 * parseFloat((amount * irate) / 100)).toFixed(3)
    )}
  </p>
)} */}
                <hr style={{ borderColor: "black" }} />
                {ismaharastra ? (
                  <div>
                    <p>{fmt.format(calculateValue().toFixed(2))}</p>
                    <p>{fmt.format(calculateValue().toFixed(2))}</p>
                  </div>
                ) : (
                  <p>{fmt.format(calculateValue().toFixed(2))}</p>
                )}

                <p>
                  {/* {Math.round(
      1.18 * parseFloat((amount * irate) / 100)
    ).toFixed(3)} */}
                  -
                </p>
                <hr style={{ borderColor: "black" }} />
                <p>
                  {fmt.format(
                    (
                      parseFloat((amount * irate) / 100) +
                      Math.round(0.18 * parseFloat((amount * irate) / 100))
                    ).toFixed(2)
                  )}
                </p>
              </td>
            </tr>

            <tr>
              <td style={{ padding: "1px" }}>
                <p>Amount Chargeable (in words) : </p>
              </td>
              <td>
                Rs{" "}
                {handleCapitalize(
                  convert(
                    (
                      parseFloat((amount * irate) / 100) +
                      Math.round(0.18 * parseFloat((amount * irate) / 100))
                    ).toString() // Convert to string explicitly
                  )
                )}{" "}
                Only{" "}
              </td>
            </tr>
          </table>
        </b>
        <br></br>
        <table style={{ borderSpacing: "0", width: "full" }}>
          <tr>
            <td>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <b>TDS Working</b>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <b>
                  TDS 10% of Total Invoice Amount (To be paid by you to Tax
                  Authorities in FY 2023-24)
                </b>
              </div>
            </td>
            <td style={{ borderLeft: "1px solid black", paddingLeft: "10px" }}>
              <b style={{ marginRight: "60px" }}>
                {fmt.format(((0.1 * (amount * irate)) / 100).toFixed(2))}
              </b>
            </td>
          </tr>
          <tr>
            <td>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <b>Amount Payable by you</b>
              </div>
            </td>
            <td style={{ borderLeft: "1px solid black", paddingLeft: "10px" }}>
              <b style={{ marginRight: "60px" }}>
                {fmt.format(
                  (
                    (amount * irate) / 100 +
                    Math.round((0.18 * (amount * irate)) / 100) -
                    (0.1 * (amount * irate)) / 100
                  ).toFixed(2)
                )}
              </b>
            </td>
          </tr>
        </table>
        <br />
        <br />
        <br />
        <p>
          <b>For Express Rupya Capital Advisors</b>
        </p>
        <p>
          <b>Authorised Signatory</b>
        </p>
        <br></br>
        <center>
          {" "}
          <b>Thank You For Your Business!</b>
        </center>
        {/* </div> */}
        <br></br>
        <b> Bank Details:</b>
        <br></br>
        <b> Account Holder Name: </b>
        Express Rupya Capital Advisors
        <br></br>
        <b> Bank Name: </b>
        HDFC BANK LTD
        <br></br>
        <b>IFSC CODE: </b>
        HDFC0000419
        <br></br>
        <b>A/c No: </b>
        50200077517526
        <br></br>
        <b>Account Type: </b>
        Current
      </div>
      {/* {companies &&
        companies.map((newCompany) => {
          return (
            <div>
              <div>{newCompany.clientName}</div>
              <div>{newCompany.address}</div>
              <div>{newCompany.GSTNo}</div>
            </div>
          );
        })} */}
      <button onClick={Export2Word} className="downloadbutton">
        Export to Word
      </button>
      <button onClick={Export2PDF} className="downloadbutton">
        Export to PDF
      </button>
      <button onClick={Export2Excel} className="downloadbutton">
        Export to Excel
      </button>
      <button onClick={AddtoDatabase} className="downloadbutton">
        {isUpdateInvoice === false ? (
          <>Export to Database</>
        ) : (
          <>Update Invoice</>
        )}
      </button>
    </div>
  );
};

export default Preview;
