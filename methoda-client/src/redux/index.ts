// import { configureStore } from "@reduxjs/toolkit";
// import CustomerReducer from "./CustomerReducer";
// import memberReducer from './memberReducer';

// export const store = configureStore({
//     reducer: {
//         customer: CustomerReducer,
//         member: memberReducer
//     }
// })
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch


import { configureStore } from '@reduxjs/toolkit';
import statusReducer from './statusSlice';
import transitionReducer from './transitionSlice';

export const store = configureStore({
  reducer: {
    statuses: statusReducer,
    transitions: transitionReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
