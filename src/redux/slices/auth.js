import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/login", params);
      return data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Не вдалося авторизуватися"
      );
    }
  }
);

export const fetchAuthMe = createAsyncThunk(
  "auth/fetchAuthMe",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/auth/me");
      return data;
    } catch (error) {
      window.localStorage.removeItem("token");
      return rejectWithValue(
        error?.response?.data?.message || "Не вдалося перевірити авторизацію"
      );
    }
  }
);

const initialState = {
  data: null,
  status: "idle",
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.status = "idle";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.data = null;
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.data = null;
        state.status = "error";
        state.error = action.payload || "Не вдалося авторизуватися";
      })
      .addCase(fetchAuthMe.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchAuthMe.rejected, (state, action) => {
        state.data = null;
        state.status = "error";
        state.error =
          action.payload || "Сесію завершено. Увійдіть в акаунт ще раз.";
      });
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
