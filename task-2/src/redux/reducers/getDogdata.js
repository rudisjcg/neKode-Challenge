import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { listAllBreedsUrl } from "../../constants";

export const getInitialDogData = createAsyncThunk(
  "dogs/initialData",
  async () => {
    try {
      const { data } = await axios.get(listAllBreedsUrl);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const dogData = createSlice({
  name: "dogsData",
  initialState: {
    dogData: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [getInitialDogData.pending]: (state) => {
      state.loading = true;
    },
    [getInitialDogData.fulfilled]: (state, action) => {
      state.loading = false;
      state.dogData = action.payload;
    },
    [getInitialDogData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default dogData.reducer;
