import { PRODUCTS_URL } from '../../constants'
import { apiSlice } from './apiSlice'

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query({
      query: ({ category, brand, isActive, search }) => {
        let url = `${PRODUCTS_URL}?`
        if (category) {
          url += `category=${category}`
        }
        if (search) {
          url += `search=${search}`
        }
        if (brand) {
          url += `brand=${brand}`
        }
        if (isActive !== null) {
          url += `is_active=${isActive}`
        }

        return url
      },
      providesTags: ['Product']
    }),
    getProduct: builder.query({
      query: id => `${PRODUCTS_URL}${id}/`,
      providesTags: ['Product']
    }),
    addProduct: builder.mutation({
      query: body => ({
        url: PRODUCTS_URL,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Product']
    }),
    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `${PRODUCTS_URL}${id}/`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['Product']
    }),

    deleteProduct: builder.mutation({
      query: id => ({
        url: `${PRODUCTS_URL}${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Product']
    })
  })
})

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductQuery
} = productsApiSlice
