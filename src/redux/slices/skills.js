import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchSkills = createAsyncThunk("skills/fetchSkills", async () => {
  const { data } = await axios.get("/skills");
  return data;
});

export const fetchRemoveSkill = createAsyncThunk(
  "skills/fetchRemoveSkill",
  async (id) => {
    const { data } = await axios.delete(`/skills/${id}`);
    return data;
  }
);

const initialState = {
  skills: {
    items: [],
    status: "loading",
  },
};

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSkills.pending]: (state) => {
      state.skills.items = [];
      state.skills.status = "loading";
    },
    [fetchSkills.fulfilled]: (state, action) => {
      state.skills.items = action.payload;
      state.skills.status = "loaded";
    },
    [fetchSkills.rejected]: (state) => {
      state.skills.items = [];
      state.skills.status = "error";
    },
    // skill deletion
    [fetchRemoveSkill.pending]: (state, action) => {
      // eslint-disable-next-line no-underscore-dangle
      state.skills.items = state.skills.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
  },
});

export const skillsReducer = skillsSlice.reducer;
