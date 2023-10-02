import React from "react";
import logo from "../image/Logo_Vetor_Aiyl_Bank_2.png";

const Navbar = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={logo} alt="logo" style={{ width: "30%", height: "25%" }} />
    </div>
  );
};

export default Navbar;
