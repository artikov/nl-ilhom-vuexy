import { WAREHOUSES_URL } from 'src/constants'
import { apiSlice } from './apiSlice'

export const warehousesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getWarehouses: builder.query({
      query: ({ responsible, search }) => {
        let url = WAREHOUSES_URL
        if (responsible) {
          url += `?responsible=${responsible}`
        }
        if (search) {
          url += `${responsible ? '&' : '?'}search=${search}`
        }

        return url
      },
      providesTags: ['Warehouse']
    }),
    getWarehouse: builder.query({
      query: id => `${WAREHOUSES_URL}${id}`,
      providesTags: ['Warehouse']
    }),
    createWarehouse: builder.mutation({
      query: data => ({
        url: WAREHOUSES_URL,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Warehouse']
    }),
    updateWarehouse: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${WAREHOUSES_URL}${id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['Warehouse']
    }),
    deleteWarehouse: builder.mutation({
      query: id => ({
        url: `${WAREHOUSES_URL}${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Warehouse']
    })
  }),
  overrideExisting: false
})

export const {
  useGetWarehousesQuery,
  useCreateWarehouseMutation,
  useGetWarehouseQuery,
  useUpdateWarehouseMutation,
  useDeleteWarehouseMutation
} = warehousesApiSlice
