import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Login,
  Dashboard,
  InvoiceForm,
  GetInvoice,
  PastInvoice,
  CreateClient,
  CreateLender,
  Landing,
  UpdateClient,
  UpdateLender,
  UpdateInvoice,
  ProtectedRoute,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./index.css";
function App() {
  return (
    <>
      <BrowserRouter>
        <Fragment>
          <Routes>
            <Route path="/">
              <Route exact path="/" element={<ProtectedRoute />}>
                <Route index element={<Landing />} />
              </Route>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route exact path="/" element={<ProtectedRoute />}>
              <Route path="/dashboard">
                <Route index element={<Dashboard />} />
                <Route path="/dashboard/:id" element={<PastInvoice />} />
              </Route>
            </Route>
            <Route exact path="/" element={<ProtectedRoute />}>
              <Route path="/createInvoice">
                <Route index element={<InvoiceForm />} />
                <Route path="/createInvoice/:id" element={<UpdateInvoice />} />
              </Route>
            </Route>
            <Route exact path="/" element={<ProtectedRoute />}>
              <Route path="/clients">
                <Route index element={<CreateClient />} />
                <Route path="/clients/:id" element={<UpdateClient />} />
              </Route>
            </Route>
            <Route exact path="/" element={<ProtectedRoute />}>
              <Route path="/lenders">
                <Route index element={<CreateLender />} />
                <Route path="/lenders/:id" element={<UpdateLender />} />
              </Route>
            </Route>
          </Routes>
        </Fragment>
      </BrowserRouter>
      <ToastContainer style={{ fontSize: "12px" }} position="top-center" />
    </>
  );
}

export default App;
