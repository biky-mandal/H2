import React, { useState } from "react";
import "./style.css";
import { FiSend, FiX } from 'react-icons/fi'

/**
 * @author
 * @function Chatbox
 **/

const Chatbox = (props) => {
  const [message, setMessage] = useState(null);

  return (
    <div className="chatbox">
      <div className="topbox">
        <label className="top-chatbox-lbl">message</label>
        <span><FiX/></span>
      </div>
      <div className="midbox"></div>
      <div className="buttombox">
        <input 
          className="chat-input" 
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <span><FiSend/></span>
      </div>
    </div>
  );
};

export default Chatbox;
