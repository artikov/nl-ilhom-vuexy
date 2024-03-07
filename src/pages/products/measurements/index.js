/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'

import { Typography, Grid, CircularProgress } from '@mui/material'

import CustomTable from 'src/components/CustomTable/CustomTable'

import {
  useGetMeasurementsQuery,
  useAddMeasurementMutation,
  useDeleteMeasurementMutation
} from 'src/store/slices/measurementsApiSlice'

const Measurements = () => {
  const [search, setSearch] = useState('')
  const [noQueryData, setNoQueryData] = useState(null)

  const { data: measurements, isLoading } = useGetMeasurementsQuery({
    search
  })
  const [addMeasurement] = useAddMeasurementMutation()
  const [deleteMeasurement] = useDeleteMeasurementMutation()

  useEffect(() => {
    if (!search && measurements) {
      setNoQueryData(measurements)
    }
  }, [search, measurements])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h1'>O'lchovlar</Typography>
      </Grid>
      <Grid item xs={12}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <CustomTable
            page={"O'lchov"}
            data={measurements?.results}
            handleCreateApi={addMeasurement}
            handleDeleteApi={deleteMeasurement}
            onSearchChange={setSearch}
            search={search}
            dataWithoutQuery={noQueryData}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default Measurements
