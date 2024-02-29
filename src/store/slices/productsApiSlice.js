import { PRODUCTS_URL } from '../../constants'
import { apiSlice } from './apiSlice'

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query({
      query: () => `${PRODUCTS_URL}`
    }),
    addProduct: builder.mutation({
      query: body => ({
        url: PRODUCTS_URL,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Product']
    })
  })
})

export const { useGetProductsQuery, useAddProductMutation } = productsApiSlice
