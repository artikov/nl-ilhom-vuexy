import { SUPPLIERS_URL } from 'src/constants'
import { apiSlice } from './apiSlice'

export const suppliersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getSuppliers: builder.query({
      query: ({ person_type, search }) => {
        let url = `${SUPPLIERS_URL}?`
        if (person_type) {
          url += `person_type=${person_type}&`
        }
        if (search) {
          url += `search=${search}`
        }

        return url
      },
      providesTags: ['Supplier']
    }),
    getSupplier: builder.query({
      query: id => `${SUPPLIERS_URL}${id}`,
      providesTags: ['Supplier']
    }),
    updateSupplier: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `${SUPPLIERS_URL}${id}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['Supplier']
    }),
    addSupplier: builder.mutation({
      query: body => ({
        url: SUPPLIERS_URL,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Supplier']
    }),
    deleteSupplier: builder.mutation({
      query: id => ({
        url: `${SUPPLIERS_URL}${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Supplier']
    })
  }),
  overrideExisting: false
})

export const {
  useGetSuppliersQuery,
  useAddSupplierMutation,
  useDeleteSupplierMutation,
  useUpdateSupplierMutation,
  useGetSupplierQuery
} = suppliersApiSlice
