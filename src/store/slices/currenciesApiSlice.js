import { CURRENCIES_URL } from 'src/constants'
import { apiSlice } from './apiSlice'

export const currenciesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCurrencies: builder.query({
      query: () => CURRENCIES_URL,
      providesTags: ['Currency']
    }),
    getCurrency: builder.query({
      query: id => `${CURRENCIES_URL}${id}/`,
      providesTags: ['Currency']
    }),
    updateCurrency: builder.mutation({
      query: currency => ({
        url: `${CURRENCIES_URL}${currency.id}/`,
        method: 'PUT',
        body: currency
      }),
      invalidatesTags: ['Currency']
    }),
    addCurrency: builder.mutation({
      query: currency => ({
        url: CURRENCIES_URL,
        method: 'POST',
        body: currency
      }),
      invalidatesTags: ['Currency']
    }),
    deleteCurrency: builder.mutation({
      query: id => ({
        url: `${CURRENCIES_URL}${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Currency']
    })
  }),
  overrideExisting: false
})

export const {
  useGetCurrenciesQuery,
  useGetCurrencyQuery,
  useUpdateCurrencyMutation,
  useAddCurrencyMutation,
  useDeleteCurrencyMutation
} = currenciesApiSlice
