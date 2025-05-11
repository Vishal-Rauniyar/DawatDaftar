import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import register_pic from "../../Assets/features-2.png";
import { userContext } from "../../App";
import emailjs from "emailjs-com";
// import { GoogleLogin, GoogleLogout } from "react-google-login";
// const clientId =
//   "835855805452-eh8cmbqi3vfufgivh654qhv1fso1t8r2.apps.googleusercontent.com";

const Signup = () => {
  const navigate = useNavigate();  // Use useNavigate for React Router v6
  const { state, dispatch } = useContext(userContext);
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  // Register using Google
  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);
  const onLoginSuccess = (res) => {
    console.log("Login Success:", res.profileObj);
    setShowloginButton(false);
    setShowlogoutButton(true);
  };

  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };

  const onSignoutSuccess = () => {
    alert("You have been logged out successfully");
    console.clear();
    setShowloginButton(true);
    setShowlogoutButton(false);
  };

  const form = useRef();

  // Handling user inputs
  let name, value;
  const ehandle = (e) => {
    name = e.target.name;
    value = e.target.value;

    setuser({ ...user, [name]: value }); // Array to store dynamic data name will have e.target.value direct coz of []
    localStorage.setItem("username", user.name);
  };

  const postdata = async (e) => {
    e.preventDefault();
    emailjs // To send Registration Confirmation email to user
      .sendForm(
        "service_kfqmavc",
        "template_0eo9nsj",
        form.current,
        "mPv8BzMqq9aVzTSEL"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    const { name, email, password, cpassword } = user; // Has user inputs from frontend
    const res = await fetch("/register", {
      method: "POST", // Pushing data to the backend database
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        // data should be in string format to send server
        name: name,
        email,
        password: password,
        cpassword, // key value same so can use any of one value
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert("Invalid Registration");
      setuser({ ...user, name: "", email: "", password: "", cpassword: "" });
    } else {
      dispatch({ type: "USER", payload: true });
      window.alert("Registration Successful");
      navigate("/");  // Use navigate instead of history.push
    }
  };

  return (
    <>
      <div className="container">
        <div className="row py-5 mt-1 align-items-center">
          <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
            <img
              src={register_pic}
              alt=""
              className="img-fluid mb-3 d-none d-md-block"
            />
          </div>
          <div className="col-md-7 col-lg-6 ml-auto mt-2">
            <a onClick={() => navigate("/login")}>  {/* Use navigate instead of history.push */}
              <h4
                style={{
                  textAlign: "center",
                  color: "black",
                  fontFamily: "Pacifico",
                  fontSize: "1.0 rem",
                }}
              >
                Already have an account?
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
                Register
              </span>
              <div className="border-bottom w-100 mr-5"></div>
            </div>
            <br />
            <form ref={form} method="POST">
              <div className="row">
                <div className="input-group col-lg-12 mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-white px-4 border-md border-right-0">
                      <i className="fa fa-user text-muted"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    autoComplete="off"
                    value={user.name}
                    onChange={ehandle}
                    name="name"
                    placeholder="Name"
                    className="form-control bg-white border-left-0 border-md"
                  />
                </div>
                <div className="input-group col-lg-12 mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-white px-4 border-md border-right-0">
                      <i className="fa fa-envelope text-muted"></i>
                    </span>
                  </div>
                  <input
                    autoComplete="off"
                    type="email"
                    value={user.email}
                    onChange={ehandle}
                    name="email"
                    placeholder="Email"
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
                    autoComplete="off"
                    type="password"
                    value={user.password}
                    onChange={ehandle}
                    name="password"
                    placeholder="Password"
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
                    autoComplete="off"
                    value={user.cpassword}
                    onChange={ehandle}
                    name="cpassword"
                    placeholder="Confirm Password"
                    className="form-control bg-white border-left-0 border-md"
                  />
                </div>

                <div className="form-group col-lg-6 mx-auto mb-0">
                  <a className="btn btn-dark btn-block py-2" onClick={postdata}>
                    <span className="font-weight-bold text-white">Register</span>
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

export default Signup;
