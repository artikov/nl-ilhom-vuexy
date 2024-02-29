import { MEASUREMENTS_URL } from 'src/constants'
import { apiSlice } from './apiSlice'

export const measurementsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getMeasurements: builder.query({
      query: ({ search }) => {
        let apiUrl = `${MEASUREMENTS_URL}`

        if (search) {
          apiUrl += `?search=${search}`
        }

        return apiUrl
      },
      providesTags: ['Measurement']
    }),
    getMeasurement: builder.query({
      query: id => `${MEASUREMENTS_URL}${id}/`
    }),
    addMeasurement: builder.mutation({
      query: body => ({
        url: MEASUREMENTS_URL,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Measurement']
    }),
    updateMeasurement: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `${MEASUREMENTS_URL}${id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Measurement']
    }),
    deleteMeasurement: builder.mutation({
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
