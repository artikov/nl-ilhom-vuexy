import { CLIENTS_URL } from 'src/constants'
import { apiSlice } from './apiSlice'

export const clientsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getClients: builder.query({
      query: ({ category, search }) => {
        let url = `${CLIENTS_URL}?`
        if (category) {
          url += `category=${category}&`
        }
        if (search) {
          url += `search=${search}&`
        }

        return url
      },
      providesTags: ['Client']
    }),
    getClient: builder.query({
      query: id => `${CLIENTS_URL}${id}/`,
      providesTags: ['Client']
    }),
    addClient: builder.mutation({
      query: body => ({
        url: CLIENTS_URL,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Client']
    }),
    updateClient: builder.mutation({
      query: ({ id, body }) => ({
        url: `${CLIENTS_URL}${id}/`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['Client']
    }),

    deleteClient: builder.mutation({
      query: id => ({
        url: `${CLIENTS_URL}${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Client']
    })
  }),
  overrideExisting: true
})

export const {
  useGetClientsQuery,
  useGetClientQuery,
  useAddClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation
} = clientsApiSlice
