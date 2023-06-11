import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchFacts = createAsyncThunk("facts/fetchFacts", async () => {
  const { data } = await axios.get("/facts");
  return data;
});

export const fetchRemoveFact = createAsyncThunk(
  "facts/fetchRemoveFact",
  async (id) => {
    const { data } = await axios.delete(`/facts/${id}`);
    return data;
  }
);

const initialState = {
  facts: {
    items: [],
    status: "loading",
  },
};

const factsSlice = createSlice({
  name: "facts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchFacts.pending]: (state) => {
      state.facts.items = [];
      state.facts.status = "loading";
    },
    [fetchFacts.fulfilled]: (state, action) => {
      state.facts.items = action.payload;
      state.facts.status = "loaded";
    },
    [fetchFacts.rejected]: (state) => {
      state.facts.items = [];
      state.facts.status = "error";
    },
    // skill deletion
    [fetchRemoveFact.pending]: (state, action) => {
      // eslint-disable-next-line no-underscore-dangle
      state.facts.items = state.facts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
  },
});

export const factsReducer = factsSlice.reducer;
