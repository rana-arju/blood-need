import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import bloodRequestReducer from "./bloodRequestSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bloodRequest: bloodRequestReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

