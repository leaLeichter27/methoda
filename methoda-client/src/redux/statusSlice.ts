import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Status } from '../types';
import { resetConfiguration } from './transitionSlice';

export const fetchStatuses = createAsyncThunk<Status[], void, { rejectValue: string }>(
    'statuses/fetchStatuses',
    async (_, thunkAPI) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/status/getStatuses`);
        const data = await response.json();
        console.log("fetchStatuses", data);
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue('Failed to fetch statuses.');
      }
    }
);

export const addStatus = createAsyncThunk<Status, Status, { rejectValue: string }>(
    'statuses/addStatus',
    async (status, thunkAPI) => {
      try {
        console.log("addStatus before fetch", status);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/status/addStatus`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(status)
        });
        const data = await response.json();
        console.log("addStatus", data);
        return data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data || 'Failed to add status.');
    
      }
    }

);

export const deleteStatus = createAsyncThunk<string, string, { rejectValue: string }>(
  'statuses/deleteStatus',
  async (id, thunkAPI) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/status/deleteStatus/${id}`, { method: 'DELETE' });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to delete status.');
    }
  }
);

interface StatusState {
  statuses: Status[];
  loading: boolean;
  error: string | null;
}

const initialState: StatusState = {
  statuses: [],
  loading: false,
  error: null
};

const statusSlice = createSlice({
  name: 'statuses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStatuses.fulfilled, (state, action) => {
        state.statuses = action.payload;
        state.loading = false;
      })
      .addCase(fetchStatuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch statuses';
      })
      .addCase(addStatus.fulfilled, (state, action) => {
        state.statuses.push(action.payload);
      })
      .addCase(deleteStatus.fulfilled, (state, action) => {
        state.statuses = state.statuses.filter(status => status._id || status.id !== action.payload);
      })
      .addCase(resetConfiguration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetConfiguration.fulfilled, (state) => {
        state.loading = false;
        state.statuses = [];
      })
      .addCase(resetConfiguration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  }
});

export default statusSlice.reducer;



  


