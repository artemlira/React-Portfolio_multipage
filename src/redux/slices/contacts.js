import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async () => {
    const { data } = await axios.get("/contacts");
    return data;
  }
);

export const fetchRemoveContact = createAsyncThunk(
  "contacts/fetchRemoveContact",
  async (id) => {
    const { data } = await axios.delete(`/contacts/${id}`);
    return data;
  }
);

const initialState = {
  contacts: {
    items: [],
    status: "loading",
  },
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.contacts.items = [];
        state.contacts.status = "loading";
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.items = action.payload;
        state.contacts.status = "loaded";
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.contacts.items = [];
        state.contacts.status = "error";
      })
      // contact deletion
      .addCase(fetchRemoveContact.pending, (state, action) => {
        state.contacts.items = state.contacts.items.filter(
          // eslint-disable-next-line no-underscore-dangle
          (obj) => obj._id !== action.meta.arg
        );
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
