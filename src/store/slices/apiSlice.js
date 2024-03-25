import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../constants.js'

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('access')

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    }
  }),
  tagTypes: [
    'Brand',
    'Category',
    'Measurement',
    'Product',
    'Warehouse',
    'User',
    'Supplier',
    'Entry',
    'WarehouseItem',
    'Currency',
    'ClientsCategory',
    'Client'
  ],
  endpoints: builder => ({})
})
