import { USERS_URL } from '../../constants.js'
import { apiSlice } from './apiSlice.js'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => USERS_URL,
      providesTags: ['User']
    })
  })
})

export const { useGetUsersQuery } = usersApiSlice
