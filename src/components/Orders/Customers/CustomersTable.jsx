import { useState } from 'react'
import { useRouter } from 'next/router'

import {
  Card,
  CardContent,
  Drawer,
  Grid,
  MenuItem,
  Box,
  Button,
  Pagination,
  Typography,
  Divider,
  CircularProgress
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import Icon from 'src/@core/components/icon'

import CustomTextField from 'src/@core/components/mui/text-field'

import AddCustomerDrawer from './AddCustomerDrawer'

import { useDeleteClientMutation, useGetClientsQuery } from 'src/store/slices/clientsApiSlice'
import { useGetClientsCategoriesQuery } from 'src/store/slices/clientsCategoriesApiSlice'

import { rows } from 'src/@fake-db/table/static-data'

const CustomersTable = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [search, setSearch] = useState('')

  const { data, isLoading } = useGetClientsQuery({ category: selectedCategory, search })
  const { data: clientsCategories } = useGetClientsCategoriesQuery()
  const [deleteClient, { isLoading: isDeleting }] = useDeleteClientMutation()

  const router = useRouter()

  const toggleDrawer = open => () => {
    setDrawerOpen(open)
  }

  const finalData = data?.results || rows
  const pageCount = Math.ceil(finalData.length / rowsPerPage)

  const handleDelete = async (id, event) => {
    event.stopPropagation()
    await deleteClient(id)
  }

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
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
      maxWidth: 80,
      headerName: 'ID'
    },
    {
      flex: 0.35,
      minWidth: 200,
      field: 'full_name',
      headerName: 'Mijoz Nomi'
    },
    {
      flex: 0.35,
      minWidth: 200,
      field: 'phone_number',
      headerName: 'Telefon Raqami'
    },
    {
      flex: 0.25,
      minWidth: 100,
      field: 'city',
      headerName: 'Shahar',
      valueGetter: params => params.row.city?.name
    },
    {
      flex: 0.35,
      minWidth: 200,
      field: 'company',
      headerName: 'Kompaniya'
    },
    {
      flex: 0.25,
      minWidth: 100,
      field: 'balance_usd',
      headerName: 'Balans',
      renderCell: params => (
        <Typography color={params.row.balance_usd < 0 ? 'error' : 'success'}>{params.row.balance_usd}</Typography>
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
        <Button color='error' onClick={e => handleDelete(params.row.id, e)} disabled={isDeleting}>
          <Icon icon='tabler:trash' />
        </Button>
      )
    }
  ]

  const AddCustomer = <AddCustomerDrawer toggleDrawer={toggleDrawer} />

  return (
    <Card>
      <div>
        <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer(false)}>
          {AddCustomer}
        </Drawer>
      </div>
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography variant='h3' mb={6}>
              Filter
            </Typography>
            <Grid container item xs={12} md={6} spacing={2}>
              <Grid item md={10}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue=''
                  SelectProps={{ displayEmpty: true }}
                  onChange={({ target }) => setSelectedCategory(target.value)}
                >
                  <MenuItem value='' disabled>
                    <em>Kategoriya</em>
                  </MenuItem>
                  {clientsCategories?.results?.map(category => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
              <Grid item>
                <Button variant='contained' onClick={() => setSelectedCategory('')}>
                  Reset
                </Button>
              </Grid>
            </Grid>

            <Divider sx={{ marginY: '1rem' }} />
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12} md={6}>
              <CustomTextField
                fullWidth
                placeholder='Search'
                value={search}
                onChange={({ target }) => setSearch(target.value)}
                InputProps={{
                  startAdornment: <Icon icon='fluent:search-20-regular' sx={{ color: 'text.disabled', mr: 1 }} />
                }}
              ></CustomTextField>
            </Grid>
            <Grid item container xs={12} md={6} spacing={6} justifyContent={'end'}>
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
                <Button variant='contained' color='primary' fullWidth onClick={toggleDrawer(true)}>
                  Mijoz Qo'shish
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {isLoading ? (
            <CircularProgress />
          ) : (
            <Grid item xs={12}>
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
                  onRowClick={row => {
                    router.push(`/order/customers/${row.row.id}`)
                  }}
                />
              </Box>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CustomersTable
