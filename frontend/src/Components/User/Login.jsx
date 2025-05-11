import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";

const Login = () => {
  const { state, dispatch } = useContext(userContext); // To maintain user state to check if he/she is logged in or not
  const navigate = useNavigate(); // Used to manipulate the current state of the browser history

  const [user, setUser] = useState({
    email: "",
    pass: "",
  });

  let name, value;
  const subval = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value }); // To store dynamic data name which will have e.target.value directly because of []
  };

  const loginuser = async (e) => {
    e.preventDefault(); // To prevent automatic reload of form (default behaviour)
    const { email, pass } = user; // Has user inputs from frontend
    const res = await fetch("/login", {
      method: "POST", // Pushing data to the backend database for user verification
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // data should be in string format to send server
        email: email,
        pass,
      }),
    });
    const data = await res.json();

    if (res.status === 400 || !data) {
      window.alert("Invalid Credentials");
    } else {
      dispatch({ type: "USER", payload: true }); // Payload = True makes user state logged in
      window.alert("Login Successful");
      navigate("/"); // Use navigate instead of history.push in React Router v6
    }
  };

  return (
    <>
      <div className="container">
        <div className="row py-5 mt-4 align-items-center">
          <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
            <img
              src="https://i.pinimg.com/originals/8f/d8/eb/8fd8eb59bb027e607c6d14cdff1812eb.png"
              alt=""
              className="img-fluid mb-3 d-none d-md-block"
            />
          </div>
          <div className="col-md-7 col-lg-6 ml-auto mt-5">
            <a onClick={() => navigate("/register")}>
              <h4
                style={{
                  textAlign: "center",
                  color: "black",
                  fontFamily: "Pacifico",
                  fontSize: "1.0 rem",
                }}
              >
                Don't have an account?
              </h4>
            </a>
            <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
              <div className="border-bottom w-100 ml-5"></div>
              <span
                style={{
                  textAlign: "center",
                  color: "black",
                  fontFamily: "Pacifico",
                  fontSize: "1.5rem",
                }}
                className="px-2 small text-muted font-weight-bold text-muted"
              >
                Welcome Back!
              </span>
              <div className="border-bottom w-100 mr-5"></div>
            </div>
            <br />
            <form method="POST">
              <div className="row">
                <div className="input-group col-lg-12 mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-white px-4 border-md border-right-0">
                      <i className="fa fa-envelope text-muted"></i>
                    </span>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={subval}
                    autoComplete="off"
                    placeholder="Email Address"
                    className="form-control bg-white border-left-0 border-md"
                  />
                </div>
                <div className="input-group col-lg-12 mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-white px-4 border-md border-right-0">
                      <i className="fa fa-lock text-muted"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    name="pass"
                    value={user.pass}
                    onChange={subval}
                    autoComplete="off"
                    placeholder="Password"
                    className="form-control bg-white border-left-0 border-md"
                  />
                </div>
                <div className="form-group col-lg-4 mx-auto mb-0">
                  <a onClick={loginuser} className="btn btn-dark btn-block py-2">
                    <span className="font-weight-bold text-white">Login</span>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
