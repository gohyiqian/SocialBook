import React from "react";
import "./message.css";

const Message = ({ own }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://images.pexels.com/photos/3851309/pexels-photo-3851309.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
          alt=""
        />
        <p className="messageText">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit id et
          aspernatur facilis, quos quae harum pariatur sequi sed atque labore
          quod unde accusantium! Nihil voluptates corrupti debitis perferendis
          ipsa.
        </p>
      </div>
      <div className="messageBottom">1 Hour ago</div>
    </div>
  );
};

export default Message;
