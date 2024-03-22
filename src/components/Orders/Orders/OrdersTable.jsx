import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Card, CardContent, Grid, Box, Button, MenuItem, Chip, Pagination } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'

import CustomTextField from 'src/@core/components/mui/text-field'
import OrdersFilters from './OrdersFilters'

import { rows } from 'src/@fake-db/table/static-data'

const OrdersTable = () => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const finalData = rows

  const pageCount = Math.ceil(finalData.length / rowsPerPage)

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  const handleDelete = (id, event) => {
    event.stopPropagation()
    console.log('Deleted:', id)
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
      minWidth: 100,
      field: 'name',
      headerName: 'Mijoz nomi'
    },

    {
      flex: 0.2,
      minWidth: 150,
      field: 'date',
      headerName: 'Sana',
      valueGetter: params => {
        const rawDate = params?.row?.start_date
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
      valueGetter: params => params?.row?.salary || 'N/A'
    },
    {
      flex: 0.2,
      minWidth: 100,
      field: 'price',
      headerName: `Summasi`,
      valueGetter: params => params?.row?.salary || 'N/A'
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
        params?.row?.status === 'done' ? (
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
        <Grid container spacing={6}>
          <OrdersFilters

          // onSupplierChange={onSupplierChange}
          // dataWithoutQuery={dataWithoutQuery}
          // onWarehouseChange={onWarehouseChange}
          // onStatusChange={onStatusChange}
          // setFilteredData={setFilteredData}
          />
          <Grid item xs={12} marginBottom={6}>
            <Grid container spacing={6}>
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
                    <Link href='create-order'>
                      <Button variant='contained' color='primary' fullWidth>
                        + Buyurtma Yaratish
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ height: 650 }}>
              <DataGrid
                columns={columns}
                rows={rows?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)}
                slots={{
                  pagination: CustomPagination
                }}
                pagination
                pageSize={rowsPerPage}
                onRowClick={row => {
                  router.push(`./orders/${row.row.id}`)
                }}
                sx={{ cursor: 'pointer' }}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default OrdersTable
