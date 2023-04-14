import React from "react";

const Alert = ({ alert }) => {
  const captializeMessage = (text) => {
    const updatedText = text.charAt(0).toUpperCase() + text.slice(1);
    return updatedText;
  };
  return (
    <div style={{ height: "50px" }}>
      {alert && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show`}
          role="alert"
          style={{ position: "sticky" }}
        >
          <strong>{alert.msg}</strong>
        </div>
      )}
    </div>
  );
};

export default Alert;
