import { AUTH_URL } from '../../cosntants.js'
import { apiSlice } from './apiSlice.js'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({})
})

export const { useLoginMutation, useLogoutMutation } = usersApiSlice
