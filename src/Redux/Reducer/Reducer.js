import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  showEventForm: false,
  selectedDate: null,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      state.items.splice(index, 1);
    },
    toggleEventForm: (state, action) => {
      state.showEventForm = !state.showEventForm;
      state.selectedDate = action.payload ? action.payload : null;
    },
    editItem: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});


export default calendarSlice.reducer;
