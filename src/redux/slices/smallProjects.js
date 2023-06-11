import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchSmallProjects = createAsyncThunk(
  "smallProjects/fetchSmallProjects",
  async () => {
    const { data } = await axios.get("/small");
    return data;
  }
);

export const fetchRemoveSmallProject = createAsyncThunk(
  "smallProjects/fetchRemoveSmallProject",
  async (id) => {
    const { data } = await axios.delete(`/small/${id}`);
    return data;
  }
);

const initialState = {
  smallProjects: {
    items: [],
    status: "loading",
  },
};

const smallProjectsSlice = createSlice({
  name: "smallProjects",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSmallProjects.pending]: (state) => {
      state.smallProjects.items = [];
      state.smallProjects.status = "loading";
    },
    [fetchSmallProjects.fulfilled]: (state, action) => {
      state.smallProjects.items = action.payload;
      state.smallProjects.status = "loaded";
    },
    [fetchSmallProjects.rejected]: (state) => {
      state.smallProjects.items = [];
      state.smallProjects.status = "error";
    },
    // project deletion
    [fetchRemoveSmallProject.pending]: (state, action) => {
      state.smallProjects.items = state.smallProjects.items.filter(
        // eslint-disable-next-line no-underscore-dangle
        (obj) => obj._id !== action.meta.arg
      );
    },
  },
});

export const smallProjectsReducer = smallProjectsSlice.reducer;
