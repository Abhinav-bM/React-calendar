export const addItem = (item) => ({
  type: "calendar/addItem",
  payload: item,
});

export const removeItem = (id) => ({
  type: "calendar/removeItem",
  payload: { id },
});

export const toggleEventForm = (date) => ({
  type: "calendar/toggleEventForm",
  payload: date,
});

export const editItem = (item) => ({
  type: "calendar/editItem",
  payload: item,
});
