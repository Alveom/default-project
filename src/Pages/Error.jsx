import React from "react";
import { Link } from "react-router";

const Error = () => {
  return (
    <div>
      <h3>
        404
        <Link to="/"> Go Back</Link>
      </h3>
    </div>
  );
};

export default Error;
