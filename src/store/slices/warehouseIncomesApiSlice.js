import { ENTRIES_URL } from 'src/constants'
import { apiSlice } from './apiSlice'

export const entriesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getEntries: builder.query({
      query: ({ supplier }) => {
        let url = ENTRIES_URL
        if (supplier) {
          url += `?supplier=${supplier}`
        }

        return url
      },
      providesTags: ['Entry']
    }),
    getEntry: builder.query({
      query: id => `${ENTRIES_URL}${id}/`,
      providesTags: ['Entry']
    }),
    addEntry: builder.mutation({
      query: body => ({
        url: ENTRIES_URL,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Entry']
    }),
    updateEntry: builder.mutation({
      query: ({ id, body }) => ({
        url: `${ENTRIES_URL}${id}/`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['Entry']
    }),

    deleteEntry: builder.mutation({
      query: id => ({
        url: `${ENTRIES_URL}${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Entry']
    })
  })
})

export const { useGetEntriesQuery, useAddEntryMutation, useUpdateEntryMutation, useDeleteEntryMutation } =
  entriesApiSlice
