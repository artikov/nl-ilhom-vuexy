import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { Typography, Card, CardContent, Grid, Divider, Button, Box, Chip, Pagination } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import Icon from 'src/@core/components/icon'

import { rows } from 'src/@fake-db/table/static-data'

const Order = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [pageCount, setPageCount] = useState(Math.ceil(rows.length / rowsPerPage))

  const router = useRouter()
  const id = router.query.id

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
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Link href='/order/orders'>
            <Button variant='outlined' color='primary'>
              <Icon icon='tabler:arrow-left' style={{ marginRight: '0.5rem' }} />
              Orqaga
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='h1' mb={6}>
            Buyurtma ma'lumotlari
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} textAlign={'right'}>
          <Link href={`/order/orders/${id}/edit`}>
            <Button variant='contained' color='primary'>
              <Icon icon='tabler:edit' style={{ marginRight: '0.5rem' }} />
              O'zgartirish
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant='h4' mb={6}>
                    Omborxona
                  </Typography>
                  <Typography variant='h6' mb={4}>
                    Nomi: {id}
                  </Typography>
                  <Typography variant='h6' mb={4}>
                    Manzil: {id}
                  </Typography>
                  <Typography variant='h6' mb={6}>
                    Ma'sul Shaxs: {id}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h4' mb={6}>
                    Mijoz
                  </Typography>
                  <Typography variant='h6' mb={4}>
                    F. I. Sh: {id}
                  </Typography>
                  <Typography variant='h6' mb={4}>
                    Telefon Raqami: {id}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant='h4' my={6}>
                    Buyurtmani Yaratgan Shaxs
                  </Typography>
                  <Typography variant='h6' mb={4}>
                    Nomi: {id}
                  </Typography>
                  <Typography variant='h6' mb={4}>
                    Manzil: {id}
                  </Typography>
                  <Typography variant='h6' mb={6}>
                    Ma'sul Shaxs: {id}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h4' my={6}>
                    Buyurtmani O'zgartirgan Shaxs
                  </Typography>
                  <Typography variant='h6' mb={4}>
                    F. I. Sh: {id}
                  </Typography>
                  <Typography variant='h6' mb={4}>
                    Telefon Raqami: {id}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Typography variant='h6' my={4}>
                Statusi: {id}
              </Typography>
              <Typography variant='h6' mb={4}>
                Valyuta Kursi: {id}
              </Typography>
              <Typography variant='h6' mb={4}>
                Jami Miqdori: {id}
              </Typography>
              <Typography variant='h6' mb={4}>
                Jami Summa So'mda: {id}
              </Typography>
              <Typography variant='h6' mb={4}>
                Jami Summa Dollarda: {id}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ height: 650 }}>
                <DataGrid
                  columns={columns}
                  rows={rows?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)}
                  slots={{
                    pagination: CustomPagination
                  }}
                  pagination
                  pageSize={rowsPerPage}
                  sx={{ cursor: 'pointer' }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Order
