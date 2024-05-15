import React, { useState } from "react";
import Calendar from "react-calendar";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  removeItem,
  toggleEventForm,
  editItem,
} from "./Redux/Action/Actions";
import moment from "moment"; 
import './App.css'

function App() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.calendar.items);
  const showEventForm = useSelector((state) => state.calendar.showEventForm);
  const [newEvent, setNewEvent] = useState({ title: "", type: "event" }); 
  const [editEvent, setEditEvent] = useState(null); 

  const handleAddEvent = (date) => {
    console.log("date that user clicke : ", date);
    dispatch(toggleEventForm(date)); 
  };

  const handleEventFormSubmit = (e, date) => {
    e.preventDefault();
    const { title, type } = newEvent;
    const newItem = {
      id: Math.random().toString(),
      date,
      title,
      type,
    };
    if (editEvent) {
      // If editing an existing event
      dispatch(editItem({ ...editEvent, title, type }));
      setEditEvent(null); // Clear edit state
    } else {
      dispatch(addItem(newItem));
    }
    setNewEvent({ title: "", type: "event" }); // Reset new event state
    dispatch(toggleEventForm()); // Close event form after submission
  };

  const handleEventDelete = (id) => {
    dispatch(removeItem(id));
  };

  const handleEditEvent = (event) => {
    setEditEvent(event); // Set state for editing the selected event
    setNewEvent({ title: event.title, type: event.type }); // Populate form with existing data
    dispatch(toggleEventForm(event.date)); // Open form with the event's date
  };

  return (
    <div className="App">
      {/* <h1>Calendar</h1> */}
      <div className="calendar-container">
        <Calendar
          onClickDay={handleAddEvent}
          // tileContent={({ date, view }) => {
          //   // const event = items.find(item => item.date.isSame(date, 'day'))
          //   // return (
          //   //   <div>
          //   //     <span>{date.getDate()}</span>
          //   //     {event && <div className="event-dot"></div>}
          //   //   </div>
          //   // );
          // }}
        />
      </div>

      {showEventForm && (
        <form onSubmit={handleEventFormSubmit}>
          <h2>{editEvent ? "Edit Event" : "Add Event"}</h2>
          <label>
            Title:
            <input
              type="text"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
          </label>
          {/* Add additional input fields for event details if needed */}
          {/* You can add more input fields here for details like description, time, etc. */}
          <label>
            Description:
            <textarea
              value={newEvent.description || ""}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
            />
          </label>
          <button type="submit">{editEvent ? "Save" : "Add"}</button>
        </form>
      )}
      {items.length > 0 && (
        <ul className="event-list">
          {items.map((item) => (
            <li key={item.id}>
              <span>{moment(item.date).format("YYYY-MM-DD")}</span> -{" "}
              {item.title}
              {item.description && <p>{item.description}</p>}{" "}
              {/* Display description if available */}
              <button onClick={() => handleEditEvent(item)}>Edit</button>
              <button onClick={() => handleEventDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
