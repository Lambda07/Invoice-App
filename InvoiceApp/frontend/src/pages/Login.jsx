import axios from "axios";
import "../axios";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.username || !values.password) {
      return toast.error("Invalid credentials");
    }
    try {
      let user = await axios.post("/auth/login", values);
      user = user.data[0];
      if (!user) {
        toast.error("Invalid credentials");
        return;
      }
      localStorage.setItem("user", JSON.stringify(true));
      toast.success(`Welcome ${user.username}`);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex h-100 justify-content-center align-items-center bg-primary" >
      <div className="p-3 bg-white w-25 " >
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3" >
            <label style={{ fontSize: "18px" }} htmlFor="username" >
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              className="form-control"
              value={values.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label style={{ fontSize: "18px" }} htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="form-control"
              value={values.password}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-success">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
