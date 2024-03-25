import { CLIENTS_CATEGORIES } from 'src/constants'
import { apiSlice } from './apiSlice'

export const clientsCategoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getClientsCategories: builder.query({
      query: () => CLIENTS_CATEGORIES,
      providesTags: ['ClientsCategory']
    }),
    getClientsCategory: builder.query({
      query: id => `${CLIENTS_CATEGORIES}${id}/`,
      providesTags: ['ClientsCategory']
    }),
    updateClientsCategory: builder.mutation({
      query: clientsCategory => ({
        url: `${CLIENTS_CATEGORIES}${clientsCategory.id}/`,
        method: 'PUT',
        body: clientsCategory
      }),
      invalidatesTags: ['ClientsCategory']
    }),
    addClientsCategory: builder.mutation({
      query: clientsCategory => ({
        url: CLIENTS_CATEGORIES,
        method: 'POST',
        body: clientsCategory
      }),
      invalidatesTags: ['ClientsCategory']
    }),
    deleteClientsCategory: builder.mutation({
      query: id => ({
        url: `${CLIENTS_CATEGORIES}${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['ClientsCategory']
    })
  }),
  overrideExisting: false
})

export const {
  useGetClientsCategoriesQuery,
  useGetClientsCategoryQuery,
  useUpdateClientsCategoryMutation,
  useAddClientsCategoryMutation,
  useDeleteClientsCategoryMutation
} = clientsCategoriesApiSlice
