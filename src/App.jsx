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
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.calendar.items);
  const showEventForm = useSelector((state) => state.calendar.showEventForm);
  const [newEvent, setNewEvent] = useState({ title: "", type: "event" });
  const [editEvent, setEditEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleAddEvent = (date) => {
    setSelectedDate(date);
    setEditEvent(null); // Clear edit state when adding a new event
    setNewEvent({ title: "", type: "event" }); // Reset the new event state
    dispatch(toggleEventForm(true));
  };

  const handleEventFormSubmit = (e) => {
    e.preventDefault();
    const { title, type } = newEvent;
    const newItem = {
      id: editEvent ? editEvent.id : Math.random().toString(),
      date: selectedDate,
      title,
      type,
    };
    if (editEvent) {
      dispatch(editItem(newItem));
      setEditEvent(null);
    } else {
      dispatch(addItem(newItem));
    }
    setNewEvent({ title: "", type: "event" }); // Reset new event state
    dispatch(toggleEventForm(false)); // Close event form after submission
  };

  const handleEventDelete = (id) => {
    dispatch(removeItem(id));
  };

  const handleEditEvent = (event) => {
    setEditEvent(event); // Set state for editing the selected event
    setNewEvent({ title: event.title, type: event.type }); // Populate form with existing data
    setSelectedDate(event.date); // Set the selected date to the event's date
    dispatch(toggleEventForm(true)); // Open form with the event's date
  };

  return (
    <div className="App">
      <div className="calendar-container">
        <Calendar onClickDay={handleAddEvent} />
      </div>

      <div>
        {showEventForm && (
          <form onSubmit={handleEventFormSubmit}>
            <div className="form-content">
              <h2>{editEvent ? "Edit Event" : "Add Event"}</h2>

              <input
                type="text"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
              />

              <button type="submit">{editEvent ? "Save" : "Add"}</button>
            </div>
          </form>
        )}

        <ul className="event-list">
          <h3>EVENTS</h3>
          {items.length > 0 ? (
            <div>
              {items.map((item) => (
                <div className="list-div" key={item.id}>
                  <li>
                    <span>{moment(item.date).format("YYYY-MM-DD")}</span>{" "}
                    {item.title}
                    {item.description && <p>{item.description}</p>}{" "}
                    <div className="edit-delete">
                      <i
                        onClick={() => handleEditEvent(item)}
                        className="fa-solid fa-file-pen"
                      ></i>
                      <i
                        onClick={() => handleEventDelete(item.id)}
                        className="fa-solid fa-trash"
                      ></i>
                    </div>
                  </li>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-events">No events added</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
