import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

interface User {
  id: string
  name: string
  email: string
  role: string
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    clearUser: (state) => {
      state.user = null
      state.isAuthenticated = false
    },
    updateUserRole: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.role = action.payload
      }
    },
  },
})

export const { setUser, clearUser, updateUserRole } = authSlice.actions
export default authSlice.reducer

