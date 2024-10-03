import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  return (
    <div>
      <h1>error</h1>
      <div>
        {err.status}: {err.statusText}
      </div>
    </div>
  );
};

export default Error;