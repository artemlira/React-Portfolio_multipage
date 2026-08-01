import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import sortProjectsByNewest from "../../utils/projects";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const { data } = await axios.get("/projects");
    return data;
  }
);

export const fetchRemoveProject = createAsyncThunk(
  "projects/fetchRemoveProject",
  async (id) => {
    const { data } = await axios.delete(`/projects/${id}`);
    return data;
  }
);

const initialState = {
  projects: {
    items: [],
    status: "loading",
  },
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // project receipt
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.projects.items = [];
        state.projects.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects.items = sortProjectsByNewest(action.payload);
        state.projects.status = "loaded";
      })
      .addCase(fetchProjects.rejected, (state) => {
        state.projects.items = [];
        state.projects.status = "error";
      })
      // project deletion
      .addCase(fetchRemoveProject.pending, (state, action) => {
        // eslint-disable-next-line no-underscore-dangle
        state.projects.items = state.projects.items.filter(
          // eslint-disable-next-line no-underscore-dangle
          (obj) => obj._id !== action.meta.arg
        );
      });
  },
});

export const projectsReducer = projectsSlice.reducer;
