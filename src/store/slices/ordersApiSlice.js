import { ORDERS_URL } from 'src/constants'
import { apiSlice } from './apiSlice'

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getOrders: builder.query({
      query: ({ client, warehouse, status }) => {
        let url = `${ORDERS_URL}?`
        if (client) {
          url += `client=${client}&`
        }
        if (warehouse) {
          url += `warehouse=${warehouse}&`
        }
        if (status) {
          url += `status=${status}&`
        }

        return url
      },
      providesTags: ['Order']
    }),
    getOrder: builder.query({
      query: id => `${ORDERS_URL}${id}`,
      providesTags: ['Order']
    }),
    createOrder: builder.mutation({
      query: order => ({
        url: ORDERS_URL,
        method: 'POST',
        body: order
      }),
      invalidatesTags: ['Order']
    }),
    updateOrder: builder.mutation({
      query: ({ id, order }) => ({
        url: `${ORDERS_URL}${id}`,
        method: 'PUT',
        body: order
      }),
      invalidatesTags: ['Order']
    }),
    deleteOrder: builder.mutation({
      query: id => ({
        url: `${ORDERS_URL}${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Order']
    })
  })
})

export const {
  useGetOrderQuery,
  useGetOrdersQuery,
  useCreateOrderMutation,
  useDeleteOrderMutation,
  useUpdateOrderMutation
} = ordersApiSlice
