import { BRANDS_URL } from 'src/constants'

import { apiSlice } from './apiSlice'

export const brandsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getBrands: builder.query({
      query: () => `${BRANDS_URL}`,
      providesTags: ['Brand']
    }),
    addBrand: builder.mutation({
      query: body => ({
        url: `${BRANDS_URL}`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Brand']
    }),
    updateBrand: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `${BRANDS_URL}/${id}`,
        method: 'PUT',
        body
      })
    }),
    deleteBrand: builder.mutation({
      query: id => ({
        url: `${BRANDS_URL}${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Brand']
    })
  })
})

export const { useGetBrandsQuery, useAddBrandMutation, useUpdateBrandMutation, useDeleteBrandMutation } = brandsApiSlice
