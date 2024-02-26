import { BRANDS_URL } from 'src/cosntants'

import { apiSlice } from './apiSlice'

export const brandsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getBrands: builder.query({
      query: () => `${BRANDS_URL}`
    }),
    addBrand: builder.mutation({
      query: body => ({
        url: `${BRANDS_URL}`,
        method: 'POST',
        body
      })
    })
  })
})

export const { useGetBrandsQuery, useAddBrandMutation } = brandsApiSlice
