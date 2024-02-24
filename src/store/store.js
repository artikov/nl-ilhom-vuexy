import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice'
import rootReducer from './rootReducers'

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware)
})
