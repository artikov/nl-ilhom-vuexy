import { CATEGORIES_URL } from 'src/constants'
import { apiSlice } from './apiSlice'

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query({
      query: ({ parent, search }) => {
        let apiUrl = `${CATEGORIES_URL}`

        if (parent) {
          apiUrl += `?parent=${parent}`
        }

        if (search) {
          apiUrl += `${parent ? '&' : '?'}search=${search}`
        }

        return apiUrl
      },
      providesTags: ['Category']
    }),
    createCategory: builder.mutation({
      query: body => ({
        url: CATEGORIES_URL,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Category']
    }),
    getCategory: builder.query({
      query: id => `${CATEGORIES_URL}${id}`,
      providesTags: ['Category']
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `${CATEGORIES_URL}${id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Category']
    }),
    deleteCategory: builder.mutation({
      query: id => ({
        url: `${CATEGORIES_URL}${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Category']
    })
  }),
  overrideExisting: false
})

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation
} = categoriesApiSlice
