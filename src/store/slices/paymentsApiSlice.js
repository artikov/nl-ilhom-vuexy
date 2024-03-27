import { PAYMENTS_URL } from 'src/constants'
import { apiSlice } from './apiSlice'

export const paymentsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPayments: builder.query({
      query: ({ client, payment_type, currency }) => {
        let url = `${PAYMENTS_URL}?`
        if (client) {
          url += `client=${client}&`
        }
        if (payment_type) {
          url += `payment_type=${payment_type}&`
        }
        if (currency) {
          url += `currency=${currency}&`
        }

        return url
      },
      providesTags: ['Payment']
    }),
    getPayment: builder.query({
      query: itemId => `${PAYMENTS_URL}${itemId}/`,
      providesTags: ['Payment']
    }),
    createPayment: builder.mutation({
      query: body => ({
        url: PAYMENTS_URL,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Payment']
    }),
    updatePayment: builder.mutation({
      query: ({ id, body }) => ({
        url: `${PAYMENTS_URL}${id}/`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['Payment']
    }),
    deletePayment: builder.mutation({
      query: id => ({
        url: `${PAYMENTS_URL}${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Payment']
    })
  })
})

export const {
  useGetPaymentsQuery,
  useGetPaymentQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation
} = paymentsApiSlice
