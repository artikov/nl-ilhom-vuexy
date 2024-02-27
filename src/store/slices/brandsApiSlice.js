import { BRANDS_URL } from 'src/constants'

import { apiSlice } from './apiSlice'

export const brandsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getBrands: builder.query({
      query: ({ parent, search, page_size }) => {
        let apiUrl = `${BRANDS_URL}?page_size=${page_size}`

        if (parent) {
          apiUrl += `&parent=${parent}`
        }

        if (search) {
          apiUrl += `&search=${search}`
        }

        return apiUrl
      },
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
