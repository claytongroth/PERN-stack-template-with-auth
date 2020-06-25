import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  const getName = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard", {
        method: "GET", //true by default
        headers: { token: localStorage.token },
      });
      const parsedRes = await response.json();
      setName(parsedRes.user_name);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getName();
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully!")
  }

  return (
    <Fragment>
      <h1>Dashboard</h1>
      <h5>{`Hello, ${name}`}</h5>
      <button 
        className="btn btn-primary" 
        onClick={e=>logout(e)}
      > 
        Logout 
      </button>
    </Fragment>
  );
};

export default Dashboard;
