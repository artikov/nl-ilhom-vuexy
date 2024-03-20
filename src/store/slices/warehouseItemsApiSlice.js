import { WAREHOUSE_ITEMS_URL } from 'src/constants'
import { apiSlice } from './apiSlice'

export const warehouseItemsApiSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    getWarehouseItems: build.query({
      query: () => WAREHOUSE_ITEMS_URL,
      providesTags: ['WarehouseItem']
    }),
    createWarehouseItem: build.mutation({
      query: ({ data }) => ({
        url: WAREHOUSE_ITEMS_URL,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['WarehouseItem']
    }),
    updateWarehouseItem: build.mutation({
      query: ({ id, data }) => ({
        url: `${WAREHOUSE_ITEMS_URL}${id}/`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['WarehouseItem']
    }),
    deleteWarehouseItem: build.mutation({
      query: id => ({
        url: `${WAREHOUSE_ITEMS_URL}${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['WarehouseItem']
    })
  }),
  overrideExisting: false
})

export const {
  useGetWarehouseItemsQuery,
  useCreateWarehouseItemMutation,
  useUpdateWarehouseItemMutation,
  useDeleteWarehouseItemMutation
} = warehouseItemsApiSlice
