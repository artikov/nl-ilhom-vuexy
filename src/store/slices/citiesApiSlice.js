import { CITIES_URL } from 'src/constants'
import { apiSlice } from './apiSlice'

export const citiesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCities: builder.query({
      query: region => {
        let url = `${CITIES_URL}?`
        if (region) {
          url += `region=${region}&`
        }

        return url
      }
    })
  }),
  overrideExisting: false
})

export const { useGetCitiesQuery } = citiesApiSlice
