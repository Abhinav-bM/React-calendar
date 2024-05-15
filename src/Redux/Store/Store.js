import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "../Reducer/Reducer";

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
});

export default store;
