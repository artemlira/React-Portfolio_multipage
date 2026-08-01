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
  extraReducers: (builder) => {
    builder
      .addCase(fetchFacts.pending, (state) => {
        state.facts.items = [];
        state.facts.status = "loading";
      })
      .addCase(fetchFacts.fulfilled, (state, action) => {
        state.facts.items = action.payload;
        state.facts.status = "loaded";
      })
      .addCase(fetchFacts.rejected, (state) => {
        state.facts.items = [];
        state.facts.status = "error";
      })
      // skill deletion
      .addCase(fetchRemoveFact.pending, (state, action) => {
        state.facts.items = state.facts.items.filter(
          // eslint-disable-next-line no-underscore-dangle
          (obj) => obj._id !== action.meta.arg
        );
      });
  },
});

export const factsReducer = factsSlice.reducer;
