import React, { useState, useEffect, createRef } from "react";
import io from "socket.io-client";
import { Button } from "react-bootstrap";
import ChatMessage from "./ChatMessage";

const connOpt = { transports: ["websocket"] };
let socket = io("https://striveschool-api.herokuapp.com", connOpt);

function Chat(props) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState(props.userData.username);
  const chatEnd = createRef();

  useEffect(() => {
    socket.on("bmsg", (msg) => {
      setMessages((messages) => messages.concat(msg));
    });
    socket.on("connect", () => console.log("connected to socket"));
    socket.emit("setUsername", { username: "Aaron" });
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (newMessage !== "") {
      socket.emit("bmsg", {
        user: "Aaron",
        message: newMessage,
      });
      setNewMessage("");
    }
  };

  const updateMessageInput = (event) => {
    setNewMessage(event.target.value);
  };

  return (
    <div id="chat-main-container">
      <div className="chat-header d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <div
            className="mr-2"
            style={{ background: "rgba(0,0,0,.125)", width: 36, height: 36, borderRadius: "50%" }}
          ></div>
          <p className="font-weight-bold mb-0" style={{ fontSize: 14 }}>
            Everyone
          </p>
        </div>
        <div className="d-flex align-items-center">
          <i className="fas fa-expand-alt fa-flip-horizontal mr-3"></i>
          <i className="fas fa-ellipsis-h mr-3"></i>
          <i className="fas fa-times"></i>
        </div>
      </div>
      <div className="chat-middle d-flex flex-column align-items-start">
        {messages.map((message) => (
          <ChatMessage message={message} />
        ))}
        <div ref={chatEnd}></div>
      </div>
      <div className="chat-footer d-flex flex-column py-2 px-2">
        <form onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Enter a message..."
            value={newMessage}
            className="mb-2 w-100 pb-5"
            onChange={(event) => updateMessageInput(event)}
          ></input>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center px-4">
              <i className="far fa-image mr-3"></i>
              <i className="fas fa-link mr-3"></i>
              <i className="far fa-smile mr-3"></i>
              <i className="fas fa-video"></i>
            </div>
            <div className="d-flex align-items-center px-3">
              <Button type="submit" className="rounded-pill mr-3" disabled={newMessage.length === 0}>
                Send
              </Button>
              <i className="fas fa-ellipsis-h"></i>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chat;
