import { BRANDS_URL } from 'src/constants'

import { apiSlice } from './apiSlice'

export const brandsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getBrands: builder.query({
      query: ({ parent, search }) => {
        let apiUrl = `${BRANDS_URL}`

        if (parent) {
          apiUrl += `?parent=${parent}`
        }

        if (search) {
          apiUrl += `${parent ? '&' : '?'}search=${search}`
        }

        return apiUrl
      },
      providesTags: ['Brand']
    }),
    getBrand: builder.query({
      query: id => `${BRANDS_URL}${id}`,
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
        url: `${BRANDS_URL}${id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Brand']
    }),
    deleteBrand: builder.mutation({
      query: id => ({
        url: `${BRANDS_URL}${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Brand']
    })
  }),
  overrideExisting: false
})

export const {
  useGetBrandsQuery,
  useGetBrandQuery,
  useAddBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation
} = brandsApiSlice
