import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchMedias = createAsyncThunk("medias/fetchMedias", async () => {
  const { data } = await axios.get("/medias");
  return data;
});

export const fetchRemoveMedia = createAsyncThunk(
  "medias/fetchRemoveMedia",
  async (id) => {
    const { data } = await axios.delete(`/medias/${id}`);
    return data;
  }
);

const initialState = {
  medias: {
    items: [],
    status: "loading",
  },
};

const mediasSlice = createSlice({
  name: "medias",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedias.pending, (state) => {
        state.medias.items = [];
        state.medias.status = "loading";
      })
      .addCase(fetchMedias.fulfilled, (state, action) => {
        state.medias.items = action.payload;
        state.medias.status = "loaded";
      })
      .addCase(fetchMedias.rejected, (state) => {
        state.medias.items = [];
        state.medias.status = "error";
      })
      // media deletion
      .addCase(fetchRemoveMedia.pending, (state, action) => {
        state.medias.items = state.medias.items.filter(
          // eslint-disable-next-line no-underscore-dangle
          (obj) => obj._id !== action.meta.arg
        );
      });
  },
});

export const mediasReducer = mediasSlice.reducer;
