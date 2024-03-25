import { ORDERS_URL } from 'src/constants'
import { apiSlice } from './apiSlice'

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createOrder: builder.mutation({
      query: body => ({
        url: ORDERS_URL,
        method: 'POST',
        body
      })
    })
  })
})

export const { useCreateOrderMutation } = ordersApiSlice
