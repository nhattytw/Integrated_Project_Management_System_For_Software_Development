import {Dropdown} from 'react-bootstrap';
import {DropdownButton} from 'react-bootstrap';
import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
const mongoose = require('mongoose');


function App() {
  //Room State
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(socket.id + ": " + data.message);
    });
  }, [socket]);
  return (
    <div className="App">
    <label for="Room">Broadcast issue to:</label>
    <select name="Room" id="Room"        
        onChange={(event) => {
        setRoom(event.target.value);
        }}>
    <option value="All">All</option>
    <option value="Team">Team</option>
    </select>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      {messageReceived}
    </div>
  );

    }
export default App;