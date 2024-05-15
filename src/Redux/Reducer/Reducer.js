import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  showEventForm: false, // Flag to control event form visibility
  selectedDate: null, // Store selected date for event form
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      state.items.splice(index, 1);
    },
    toggleEventForm: (state, action) => {
      state.showEventForm = !state.showEventForm;
      state.selectedDate = action.payload ? action.payload : null; // Set selected date if provided
    },
  },
});

export default calendarSlice.reducer;
