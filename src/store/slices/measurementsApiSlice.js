import { MEASUREMENTS_URL } from 'src/constants'
import { apiSlice } from './apiSlice'

const measurementsApiSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    getMeasurements: build.query({
      query: ({ search }) => {
        let apiUrl = `${MEASUREMENTS_URL}`

        if (search) {
          apiUrl += `?search=${search}`
        }

        return apiUrl
      },
      providesTags: ['Measurement']
    }),
    getMeasurement: build.query({
      query: id => `${MEASUREMENTS_URL}${id}/`
    }),
    addMeasurement: build.mutation({
      query: body => ({
        url: MEASUREMENTS_URL,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Measurement']
    }),
    updateMeasurement: build.mutation({
      query: ({ id, ...body }) => ({
        url: `${MEASUREMENTS_URL}${id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Measurement']
    }),
    deleteMeasurement: build.mutation({
      query: id => ({
        url: `${MEASUREMENTS_URL}${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Measurement']
    })
  }),
  overrideExisting: false
})

export const {
  useGetMeasurementsQuery,
  useGetMeasurementQuery,
  useAddMeasurementMutation,
  useUpdateMeasurementMutation,
  useDeleteMeasurementMutation
} = measurementsApiSlice
