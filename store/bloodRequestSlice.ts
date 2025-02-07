import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface BloodRequest {
  id: string
  userId: string
  bloodType: string
  location: string
  createdAt: string
  status: "pending" | "fulfilled" | "cancelled"
}

interface BloodRequestState {
  requests: BloodRequest[]
  loading: boolean
  error: string | null
}

const initialState: BloodRequestState = {
  requests: [],
  loading: false,
  error: null,
}

const bloodRequestSlice = createSlice({
  name: "bloodRequest",
  initialState,
  reducers: {
    setRequests: (state, action: PayloadAction<BloodRequest[]>) => {
      state.requests = action.payload
      state.loading = false
      state.error = null
    },
    addRequest: (state, action: PayloadAction<BloodRequest>) => {
      state.requests.push(action.payload)
    },
    updateRequest: (state, action: PayloadAction<BloodRequest>) => {
      const index = state.requests.findIndex((request) => request.id === action.payload.id)
      if (index !== -1) {
        state.requests[index] = action.payload
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const { setRequests, addRequest, updateRequest, setLoading, setError } = bloodRequestSlice.actions
export default bloodRequestSlice.reducer

