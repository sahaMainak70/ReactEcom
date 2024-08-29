import React from "react";
import Navbar from "../components/Navbar";

const GuestLayout = (props) => {
  return (
    <>
      <Navbar />

      <main>{props.children}</main>
    </>
  );
};

export default GuestLayout;
