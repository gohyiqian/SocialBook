import React from "react";
import "./conversation.css";

const Conversation = () => {
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src="https://images.pexels.com/photos/9736348/pexels-photo-9736348.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
        alt=""
      />
      <span className="conversationName">Name</span>
    </div>
  );
};

export default Conversation;
