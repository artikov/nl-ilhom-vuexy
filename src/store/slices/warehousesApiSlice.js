import { WAREHOUSES_URL } from 'src/constants'
import { apiSlice } from './apiSlice'

export const warehousesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getWarehouses: builder.query({
      query: () => WAREHOUSES_URL,
      providesTags: ['Warehouse']
    }),
    createWarehouse: builder.mutation({
      query: data => ({
        url: WAREHOUSES_URL,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Warehouse']
    })
  })
})

export const { useGetWarehousesQuery, useCreateWarehouseMutation } = warehousesApiSlice
