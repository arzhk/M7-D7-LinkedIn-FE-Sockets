import React from "react";

function ChatMessage({ message }) {
  return (
    <div className="chat-message d-flex align-items-center">
      <div className="mr-2" style={{ background: "black", width: 32, height: 32, borderRadius: "50%" }}></div>
      <div className="d-flex flex-column">
        <div className="d-flex align-items-center pr-2">
          <p className="chat-username font-weight-bold mb-0">{message.user}</p>
          <span className="font-weight-normal" style={{ fontSize: 10 }}>
            - 00:00pm
          </span>
        </div>

        <small className="mb-0">{message.message}</small>
      </div>
    </div>
  );
}

export default ChatMessage;
