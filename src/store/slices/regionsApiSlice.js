import { REGIONS_URL } from 'src/constants'
import { apiSlice } from './apiSlice'

export const regionsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getRegions: builder.query({
      query: () => REGIONS_URL
    })
  }),
  overrideExisting: false
})

export const { useGetRegionsQuery } = regionsApiSlice
