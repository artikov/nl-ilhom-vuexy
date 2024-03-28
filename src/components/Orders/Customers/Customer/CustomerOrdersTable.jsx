import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import toast from 'react-hot-toast'

import { Card, CardContent, Grid, Box, Button, MenuItem, Chip, Pagination, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'

import CustomTextField from 'src/@core/components/mui/text-field'

import MinMaxDataPicker from 'src/components/DatePicker/MinMaxDataPicker'

import { useGetOrdersQuery, useDeleteOrderMutation } from 'src/store/slices/ordersApiSlice'
import { useGetWarehousesQuery } from 'src/store/slices/warehousesApiSlice'

const CustomerOrdersTable = () => {
  const router = useRouter()
  const clientId = router.query.id

  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [earliestDate, setEarliestDate] = useState(null)
  const [latestDate, setLatestDate] = useState(null)
  const [minDate, setMinDate] = useState(null)
  const [maxDate, setMaxDate] = useState(new Date())
  const [filteredData, setFilteredData] = useState([])
  const [filteredByDate, setFilteredByDate] = useState(false)
  const [filtered, setFiltered] = useState(false)

  const [selectedWarehouse, setSelectedWarehouse] = useState('')
  const [status, setStatus] = useState('')

  const { data: orders, isLoading } = useGetOrdersQuery({
    client: clientId,
    warehouse: selectedWarehouse,
    status
  })
  const { data: warehouses } = useGetWarehousesQuery({ responsible: '' })

  const [deleteOrder] = useDeleteOrderMutation()

  const finalData = filteredData || []

  const pageCount = Math.ceil(finalData.length / rowsPerPage)

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  const handleDelete = async (id, event) => {
    event.stopPropagation()
    console.log('Deleted:', id)

    try {
      await deleteOrder(id)
      toast.success('Deleted successfully')
    } catch (error) {
      console.error(error)
      toast.error('Failed to delete')
    }
  }

  const handleReset = () => {
    setSelectedWarehouse('')
    setStatus('')
    setFiltered(false)
  }

  const handleResetDate = () => {
    setMinDate(null)
    setMaxDate(new Date())
    setFilteredByDate(false)
  }

  const handleCustomerChange = ({ target }) => {
    setSelectedClient(target.value)
    setFiltered(true)
  }

  const handleWarehouseChange = ({ target }) => {
    setSelectedWarehouse(target.value)
    setFiltered(true)
  }

  const handleStatusChange = ({ target }) => {
    setStatus(target.value)
    setFiltered(true)
  }

  useEffect(() => {
    if (!isLoading) {
      const findMinMaxDates = () => {
        const dates = orders?.results?.map(item => new Date(item.created_at))
        const earliest = new Date(Math.min(...dates))
        const latest = new Date(Math.max(...dates))

        setEarliestDate(earliest)
        setLatestDate(latest)
      }

      findMinMaxDates()
    }
  }, [orders, isLoading])

  // Filter data between minDate and maxDate
  useEffect(() => {
    // if (!minDate || !maxDate || !dataWithoutQuery) {
    // Check if minDate, maxDate, or dataWithoutQuery is not defined

    //   return
    // }

    const minDateStartOfDay = new Date(minDate)
    minDateStartOfDay.setHours(0, 0, 0, 0)

    const maxDateEndOfDay = new Date(maxDate)
    maxDateEndOfDay.setHours(23, 59, 59, 999)

    const filteredData = orders?.results?.filter(entry => {
      const entryDate = new Date(entry.created_at)

      return entryDate >= minDateStartOfDay && entryDate <= maxDateEndOfDay
    })

    setFilteredData(filteredData)
  }, [minDate, maxDate, orders, setFilteredData])

  const handleRowClick = row => {
    const currentPath = router.asPath // Get the current path with query parameters
    const newPath = `${currentPath}order/${row.row.id}` // Concatenate with the new route
    router.push(newPath) // Push the new route
  }

  const CustomPagination = () => (
    <Pagination
      count={pageCount}
      page={currentPage}
      onChange={handlePageChange}
      variant='outlined'
      shape='rounded'
      color='primary'
    />
  )

  const columns = [
    {
      flex: 0.1,
      field: 'id',
      maxWidth: 50,
      headerName: 'ID'
    },

    {
      flex: 0.2,
      minWidth: 150,
      field: 'created_at',
      headerName: 'Sana',
      valueGetter: params => {
        const rawDate = params?.row?.created_at
        if (rawDate) {
          const formattedDate = new Intl.DateTimeFormat('uz', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
          }).format(new Date(rawDate))

          return formattedDate
        }

        return 'N/A'
      }
    },

    {
      flex: 0.2,
      minWidth: 100,
      field: 'quantity',
      headerName: `Miqdor`,
      valueGetter: params => params?.row?.quantity_sum || 'N/A'
    },
    {
      flex: 0.2,
      minWidth: 100,
      field: 'price',
      headerName: `Summasi`,
      valueGetter: params => params?.row?.order_sum_usd || 'N/A'
    },
    {
      flex: 0.2,
      minWidth: 50,
      field: 'warehouse',
      headerName: `Omborxona`,
      valueGetter: params => params?.row?.warehouse?.name || 'N/A'
    },
    {
      flex: 0.2,
      minWidth: 50,
      field: 'status',
      headerName: `Status`,
      renderCell: params =>
        params?.row?.status === 'DONE' ? (
          <Chip label='Complete' color='success' />
        ) : (
          <Chip label='Pending' color='warning' />
        )
    },

    // Delete button column
    {
      flex: 0.1,
      field: 'delete',
      sortable: false,
      headerName: '',
      maxWidth: 100,
      renderCell: params => (
        <Button color='error' onClick={event => handleDelete(params?.row?.id, event)}>
          <Icon icon='tabler:trash' />
        </Button>
      )
    }
  ]

  return (
    <Card>
      <CardContent>
        <Typography variant='h3' py={6}>
          Filter
        </Typography>
        <Grid container spacing={4}>
          <Grid container item spacing={2}>
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
          </Grid>
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={12} md={5}>
              <CustomTextField
                fullWidth
                select
                defaultValue=''
                SelectProps={{ displayEmpty: true }}
                onChange={handleWarehouseChange}
              >
                <MenuItem value='' disabled>
                  <em>Omborxona</em>
                </MenuItem>
                {warehouses?.results?.map(warehouse => (
                  <MenuItem key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12} md={5}>
              <CustomTextField
                fullWidth
                select
                defaultValue=''
                SelectProps={{ displayEmpty: true }}
                onChange={handleStatusChange}
              >
                <MenuItem value='' disabled>
                  <em>Status</em>
                </MenuItem>
                <MenuItem value='DONE'>Tugagan</MenuItem>
                <MenuItem value='IN_PROGRESS'>Jarayonda</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button variant='contained' color='primary' fullWidth onClick={handleReset} disabled={!filtered}>
                Reset
              </Button>
            </Grid>
          </Grid>

          <Grid item container xs={12} marginBottom={6}>
            <Grid item xs={12} md={7}></Grid>
            <Grid item xs={12} md={5}>
              <Grid container spacing={6} justifyContent={'end'}>
                <Grid item xs={12} md={'auto'}>
                  <CustomTextField
                    select
                    fullWidth
                    defaultValue='10'
                    id='custom-select'
                    SelectProps={{ displayEmpty: true }}
                    onChange={({ target }) => setRowsPerPage(target.value)}
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>15</MenuItem>
                    <MenuItem value={30}>20</MenuItem>
                  </CustomTextField>
                </Grid>
                <Grid item xs={12} md={'auto'}>
                  <Link href={`${clientId}/create-order`}>
                    <Button variant='contained' color='primary' fullWidth>
                      + Buyurtma Yaratish
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ height: 650 }}>
              <DataGrid
                columns={columns}
                rows={finalData?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)}
                slots={{
                  pagination: CustomPagination
                }}
                pagination
                pageSize={rowsPerPage}
                onRowClick={handleRowClick}
                sx={{ cursor: 'pointer' }}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CustomerOrdersTable

CustomerOrdersTable
