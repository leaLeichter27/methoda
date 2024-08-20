import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Transition } from '../types';

export const fetchTransitions = createAsyncThunk<Transition[], void, { rejectValue: string }>(
  'transitions/fetchTransitions',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/transition/getTransitions`);
      const data = await response.json();
      console.log("fetchTransitions", data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch Transitions.');
    }
  }
);

export const addTransition = createAsyncThunk<Transition, Partial<Transition>, { rejectValue: string }>(
  'transitions/addTransition',
  async (transition, thunkAPI) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/transition/addTransition`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(transition)
        });
        const data = await response.json();
        console.log("addTransition", data);
        return data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to add transition.');
    }
  }
);

export const deleteTransition = createAsyncThunk<string, string, { rejectValue: string }>(
  'transitions/deleteTransition',
  async (id, thunkAPI) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/transition/deleteTransition/${id}`, { method: 'DELETE' });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to delete transition.');
    }
  }
);

export const resetConfiguration = createAsyncThunk(
  'transition/resetConfiguration',
  async (_, { rejectWithValue }) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/transition/reset`, { method: 'DELETE' });
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

interface TransitionState {
  transitions: Transition[];
  loading: boolean;
  error: string | null;
}

const initialState: TransitionState = {
  transitions: [],
  loading: false,
  error: null
};

const transitionSlice = createSlice({
  name: 'transitions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransitions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransitions.fulfilled, (state, action) => {
        state.transitions = action.payload;
        state.loading = false;
      })
      .addCase(fetchTransitions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch transitions';
      })
      .addCase(addTransition.fulfilled, (state, action) => {
        //console.log({action.payload})
        state.transitions.push(action.payload);
      })
      .addCase(deleteTransition.fulfilled, (state, action) => {
        state.transitions = state.transitions.filter(transition => transition._id !== action.payload);
      })
      .addCase(resetConfiguration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetConfiguration.fulfilled, (state) => {
        state.loading = false;
        state.transitions = [];
      })
      .addCase(resetConfiguration.rejected, (state, action) => {
        state.loading = false;
      });
  }
});

export default transitionSlice.reducer;



