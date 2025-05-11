import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../Assets/profile.png";

const About = () => {
  const navigate = useNavigate();  // Use useNavigate for React Router v6
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const callPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET", // authenticate.js as a middleware will get executed and then information will be fetched
        headers: {  // Fix headers: should be plural (headers, not header)
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setUserData(data);

      if (res.status !== 200) {  // Fixed the condition to check for non-200 response
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      // Redirect to login if an error occurs
      navigate("/login");
    }
  };

  useEffect(() => {
    callPage();  // Calling callPage() after page load
  }, []);

  return (
    <>
      <div className="container mt-4 mb-4 p-4 d-flex justify-content-center">
        <div className="card p-4">
          <div className="image d-flex flex-column justify-content-center align-items-center">
            <button className="btn btn-secondary">
              <img src={profile} height="100" width="100" alt="Profile" />
            </button>
            <span className="name mt-3">{userData.name}</span>
            <span className="idd">{userData.email}</span>
            <div className="px-2 rounded mt-4 date">
              <span className="join">Joined May, 2021</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
