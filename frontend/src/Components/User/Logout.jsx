import React, { useState, useContext, useEffect } from "react";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { state, dispatch } = useContext(userContext);
  const navigate = useNavigate(); 
  useEffect(() => {
    // Redirect user to login page after logout
    dispatch({ type: "USER", payload: false });  // Update user state to logged out
    navigate("/login");  // Navigate to login page
  }, [dispatch, navigate]);

  return (
    <>
      <h1>LogOut page</h1>
    </>
  );
};

export default Logout;
