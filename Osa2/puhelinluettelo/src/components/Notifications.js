import React from "react";

const Notifications = ({ msg }) => {
  if (msg === null) {
    return null;
  }

  if (msg.indexOf("Error") === 0) {
    return <div className="error">{msg}</div>;
  } else {
    return <div className="notification">{msg}</div>;
  }
};

export default Notifications;
