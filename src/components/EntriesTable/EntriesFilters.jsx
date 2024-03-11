import { useState, useEffect } from 'react'

import { Grid, MenuItem, Typography, Divider, Button } from '@mui/material'

import CustomTextField from 'src/@core/components/mui/text-field'

import MinMaxDataPicker from 'src/components/DatePicker/MinMaxDataPicker'

import { useGetWarehousesQuery } from 'src/store/slices/warehousesApiSlice'
import { useGetSuppliersQuery } from 'src/store/slices/suppliersApiSlice'

const EntriesFilters = ({ onStatusChange, onWarehouseChange, onSupplierChange, dataWithoutQuery, setFilteredData }) => {
  const [status, setStatus] = useState('')
  const [selectedWarehouse, setSelectedWarehouse] = useState('')
  const [selectedSupplier, setSelectedSupplier] = useState('')
  const [filtered, setFiltered] = useState(false)
  const [earliestDate, setEarliestDate] = useState(null)
  const [latestDate, setLatestDate] = useState(null)
  const [minDate, setMinDate] = useState(null)
  const [maxDate, setMaxDate] = useState(new Date())
  const [filteredByDate, setFilteredByDate] = useState(false)

  const { data: warehouses } = useGetWarehousesQuery({ responsible: '' })
  const { data: suppliers } = useGetSuppliersQuery({ person_type: '' })

  const handleStatusChange = event => {
    setStatus(event.target.value)
    onStatusChange(event.target.value)
    setFiltered(true)
  }

  const handleSupplierChange = event => {
    setSelectedSupplier(event.target.value)
    onSupplierChange(event.target.value)
    setFiltered(true)
  }

  const handleWarehouseChange = event => {
    setSelectedWarehouse(event.target.value)
    onWarehouseChange(event.target.value)
    setFiltered(true)
  }

  const handleReset = () => {
    setSelectedWarehouse('')
    setSelectedSupplier('')
    setStatus('')
    onWarehouseChange('')
    onSupplierChange('')
    onStatusChange('')
    setFiltered(false)
  }

  const handleResetDate = () => {
    setMinDate(null)
    setMaxDate(new Date())
    setFilteredByDate(false)
  }

  useEffect(() => {
    // Function to parse and find earliest and latest dates
    const findMinMaxDates = () => {
      const dates = dataWithoutQuery.map(item => new Date(item.created_at))
      const earliest = new Date(Math.min(...dates))
      const latest = new Date(Math.max(...dates))

      setEarliestDate(earliest)
      setLatestDate(latest)
    }

    // Call the function to get the earliest and latest dates
    findMinMaxDates()
  }, [dataWithoutQuery])

  // Filter data between minDate and maxDate
  useEffect(() => {
    // if (!minDate || !maxDate || !dataWithoutQuery) {
    // Check if minDate, maxDate, or dataWithoutQuery is not defined

    //   return
    // }

    // Set hours, minutes, and seconds of minDate to start of the day
    const minDateStartOfDay = new Date(minDate)
    minDateStartOfDay.setHours(0, 0, 0, 0)

    // Set hours, minutes, and seconds of maxDate to end of the day
    const maxDateEndOfDay = new Date(maxDate)
    maxDateEndOfDay.setHours(23, 59, 59, 999)

    const filteredData = dataWithoutQuery.filter(entry => {
      const entryDate = new Date(entry.created_at)

      return entryDate >= minDateStartOfDay && entryDate <= maxDateEndOfDay
    })

    setFilteredData(filteredData)
  }, [minDate, maxDate, dataWithoutQuery, setFilteredData])

  return (
    <Grid item xs={12}>
      <Typography variant='h3'>Filter</Typography>
      <Grid container>
        <Grid item xs={12}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={10}>
              <MinMaxDataPicker
                earliestDate={earliestDate}
                latestDate={latestDate}
                minDate={minDate}
                maxDate={maxDate}
                setMinDate={setMinDate}
                setMaxDate={setMaxDate}
                setFilteredByDate={setFilteredByDate}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                variant='contained'
                color='primary'
                fullWidth
                onClick={handleResetDate}
                disabled={!filteredByDate}
              >
                Reset
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomTextField
                select
                defaultValue=''
                id='custom-select'
                fullWidth
                SelectProps={{ displayEmpty: true }}
                value={selectedSupplier}
                onChange={handleSupplierChange}
              >
                <MenuItem disabled value=''>
                  <em>Yetkazib Beruvchini Tanlang</em>
                </MenuItem>
                {suppliers?.results?.map(supplier => (
                  <MenuItem key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <CustomTextField
                select
                defaultValue=''
                id='custom-select'
                fullWidth
                SelectProps={{ displayEmpty: true }}
                value={selectedWarehouse}
                onChange={handleWarehouseChange}
              >
                <MenuItem disabled value=''>
                  <em>Omborxonani Tanlang</em>
                </MenuItem>
                {warehouses?.results?.map(warehouse => (
                  <MenuItem key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <CustomTextField
                select
                defaultValue=''
                id='custom-select'
                fullWidth
                SelectProps={{ displayEmpty: true }}
                value={status}
                onChange={handleStatusChange}
              >
                <MenuItem disabled value=''>
                  <em>Status</em>
                </MenuItem>
                <MenuItem value={'in_progress'}>Jarayonda</MenuItem>
                <MenuItem value={'done'}>Yakunlangan</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button variant='contained' color='primary' fullWidth onClick={handleReset} disabled={!filtered}>
                Reset
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default EntriesFilters
