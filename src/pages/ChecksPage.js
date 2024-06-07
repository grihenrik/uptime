import React from "react";
import Checks from "../components/Checks";
import useAuth from "../hooks/useAuth";

const ChecksPage = () => {
  useAuth();
  return (
    <div>
      <h1>Checks</h1>
      <Checks />
    </div>
  );
};
export default ChecksPage;
