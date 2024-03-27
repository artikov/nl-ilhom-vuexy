import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import toast from 'react-hot-toast'

import { Typography, Divider, Grid, MenuItem, Box, Button, Pagination, Drawer, CircularProgress } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'

import CustomerPaymentDrawer from './CustomerPaymentDrawer'
import MinMaxDataPicker from 'src/components/DatePicker/MinMaxDataPicker'

import { useGetPaymentsQuery, useDeletePaymentMutation } from 'src/store/slices/paymentsApiSlice'

const CustomerPayments = () => {
  const [selectedPaymentType, setSelectedPaymentType] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [itemId, setItemId] = useState(null)
  const [earliestDate, setEarliestDate] = useState(null)
  const [latestDate, setLatestDate] = useState(null)
  const [minDate, setMinDate] = useState(null)
  const [maxDate, setMaxDate] = useState(new Date())
  const [filteredByDate, setFilteredByDate] = useState(false)
  const [filtered, setFiltered] = useState(false)
  const [filteredData, setFilteredData] = useState([])

  const router = useRouter()
  const clientId = router.query.id

  const { data: payments, isLoading } = useGetPaymentsQuery({
    client: clientId,
    payment_type: selectedPaymentType,
    currency: selectedCurrency
  })
  const [deletePayment] = useDeletePaymentMutation()

  const handleSelectedPaymentTypeChange = event => {
    setSelectedPaymentType(event.target.value)
    setFiltered(true)
  }

  const handleSelectedCurrencyChange = event => {
    setSelectedCurrency(event.target.value)
    setFiltered(true)
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

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  const handleReset = () => {
    setSelectedPaymentType('')
    setSelectedCurrency('')
    setFiltered(false)
  }

  const handleResetDate = () => {
    setMinDate(null)
    setMaxDate(new Date())
    setFilteredByDate(false)
  }

  useEffect(() => {
    if (!isLoading) {
      const findMinMaxDates = () => {
        const dates = payments?.results?.map(item => new Date(item.created_at))
        const earliest = new Date(Math.min(...dates))
        const latest = new Date(Math.max(...dates))

        setEarliestDate(earliest)
        setLatestDate(latest)
      }

      findMinMaxDates()
    }
  }, [payments, isLoading])

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

    const filteredData = payments?.results?.filter(entry => {
      const entryDate = new Date(entry.created_at)

      return entryDate >= minDateStartOfDay && entryDate <= maxDateEndOfDay
    })

    setFilteredData(filteredData)
  }, [minDate, maxDate, payments, setFilteredData])

  const handleEdit = id => {
    setItemId(id)
    setDrawerOpen(true)
  }

  const handleDelete = async (id, e) => {
    e.stopPropagation()
    await deletePayment(id)
    toast.success("To'lov muvaffaqiyatli o'chirildi", {
      position: 'top-center'
    })
  }

  const toggleDrawer = open => () => {
    setDrawerOpen(open)
    setItemId(null)
  }

  const finalData = filteredData || payments?.results
  const pageCount = Math.ceil(finalData?.length / rowsPerPage)

  const columns = [
    {
      flex: 0.1,
      field: 'id',
      maxWidth: 80,
      headerName: 'ID'
    },
    {
      flex: 0.35,
      minWidth: 200,
      field: 'created_at',
      headerName: 'Sana',
      renderCell: params => <Typography>{new Date(params.row.created_at).toLocaleDateString('uz')}</Typography>
    },
    {
      flex: 0.35,
      minWidth: 100,
      field: 'payment_type',
      headerName: "To'lov Turi"
    },
    {
      flex: 0.25,
      minWidth: 100,
      field: 'price',
      headerName: 'Summasi'
    },
    {
      flex: 0.35,
      minWidth: 100,
      field: 'currency',
      headerName: 'Valyuta'
    },

    // Edit button column
    {
      flex: 0.1,
      field: 'edit',
      maxWidth: 100,
      headerName: '',
      sortable: false,
      renderCell: params => (
        <Button onClick={() => handleEdit(params.row.id)}>
          <Icon icon='tabler:edit' />
        </Button>
      )
    },

    // Delete button column
    {
      flex: 0.1,
      field: 'delete',
      maxWidth: 100,
      headerName: '',
      sortable: false,
      renderCell: params => (
        <Button color='error' onClick={e => handleDelete(params.row.id, e)}>
          <Icon icon='tabler:trash' />
        </Button>
      )
    }
  ]

  const AddPaymentDrawer = <CustomerPaymentDrawer toggleDrawer={toggleDrawer} itemId={itemId} clientId={clientId} />

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer(false)}>
            {AddPaymentDrawer}
          </Drawer>
          <Typography variant='h2' pb={6}>
            To'lovlar
          </Typography>
          <Divider />
          <Typography variant='h3' py={6}>
            Filter
          </Typography>
          <Grid container spacing={2} pb={6}>
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
            <Grid item xs={12} md={5}>
              <CustomTextField
                select
                defaultValue=''
                id='custom-select'
                fullWidth
                SelectProps={{ displayEmpty: true }}
                value={selectedPaymentType}
                onChange={handleSelectedPaymentTypeChange}
              >
                <MenuItem disabled value=''>
                  <em>To'lov Turi</em>
                </MenuItem>

                <MenuItem value='CASH'>Naxd</MenuItem>
                <MenuItem value='TRANSFER'>O'tkazma</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} md={5}>
              <CustomTextField
                select
                defaultValue=''
                id='custom-select'
                fullWidth
                SelectProps={{ displayEmpty: true }}
                value={selectedCurrency}
                onChange={handleSelectedCurrencyChange}
              >
                <MenuItem disabled value=''>
                  <em>Valyuta</em>
                </MenuItem>

                <MenuItem value='UZS'>So'm</MenuItem>
                <MenuItem value='USD'>Dollar</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button variant='contained' color='primary' fullWidth onClick={handleReset} disabled={!filtered}>
                Reset
              </Button>
            </Grid>
          </Grid>
          <Divider />
          <Grid item xs={12} py={6}>
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
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item xs={12} md={'auto'}>
                <Button variant='contained' color='primary' fullWidth onClick={toggleDrawer(true)}>
                  {`+ To'lov Yaratish`}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Box sx={{ height: 650 }}>
            <DataGrid
              initialState={{
                sorting: {
                  sortModel: [{ field: 'id', sort: 'asc' }]
                }
              }}
              columns={columns}
              rows={finalData?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)}
              slots={{
                pagination: CustomPagination
              }}
              pagination
              pageSize={rowsPerPage}
            />
          </Box>
        </>
      )}
    </>
  )
}

export default CustomerPayments
