import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import {
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Button,
  Box,
  Pagination,
  Chip,
  CircularProgress
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import Icon from 'src/@core/components/icon'

import ProductIdsDialog from 'src/components/Orders/Orders/Order/ProductIdsDialog'

import { useGetOrderQuery } from 'src/store/slices/ordersApiSlice'

const CustomerOrderDetails = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [item, setItem] = useState({})

  const router = useRouter()
  const id = router.query.id

  const { data: order, isLoading } = useGetOrderQuery(id)
  console.log(order)

  const finalData = order || []
  const pageCount = Math.ceil(finalData?.order_items?.length / rowsPerPage)

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

  const handleDialogOpen = row => {
    setItem(row)
    setIsDialogOpen(true)
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
      headerName: 'Mahsulot nomi',
      valueGetter: params => params?.row?.product?.name || 'N/A'
    },

    {
      flex: 0.2,
      minWidth: 100,
      field: 'quantity',
      headerName: `Miqdor`,
      valueGetter: params => params?.row?.quantity || 'N/A'
    },

    {
      flex: 0.2,
      minWidth: 100,
      field: 'price',
      headerName: `Narxi`,
      valueGetter: params => params?.row?.price || 'N/A'
    },

    {
      flex: 0.2,
      minWidth: 50,
      field: 'total_uzs',
      headerName: `Summa So'mda`,
      valueGetter: params => params?.row?.order_item_sum_uzs || 'N/A'
    },

    {
      flex: 0.2,
      minWidth: 50,
      field: 'total_usd',
      headerName: `Summa Dollarda`,
      valueGetter: params => params?.row?.order_item_sum_usd || 'N/A'
    },

    {
      field: 'actions',
      headerName: '',
      sortable: false,
      width: 100,
      renderCell: params => (
        <Button variant='contained' onClick={() => handleDialogOpen(params?.row)} fullWidth>
          <Icon icon='tabler:qrcode' />
        </Button>
      )
    }
  ]

  return (
    <>
      <ProductIdsDialog dialogOpen={isDialogOpen} onDialogClose={setIsDialogOpen} item={item} />
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
                    Nomi: {order?.warehouse?.name}
                  </Typography>
                  <Typography variant='h6' mb={4}>
                    Manzil: {order?.warehouse?.address}
                  </Typography>
                  <Typography variant='h6' mb={6}>
                    Ma'sul Shaxs: {order?.warehouse?.responsible?.first_name} {order?.warehouse?.responsible?.last_name}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h4' mb={6}>
                    Mijoz
                  </Typography>
                  <Typography variant='h6' mb={4}>
                    F. I. Sh: {order?.client?.full_name}
                  </Typography>
                  <Typography variant='h6' mb={4}>
                    Telefon Raqami: {order?.client?.phone_number}
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
                    Nomi: {order?.created_by?.first_name || 'admin'} {order?.created_by?.last_name}
                  </Typography>
                  <Typography variant='h6' mb={4}>
                    Telefon Raqami: {order?.created_by?.phone_number || 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h4' my={6}>
                    Buyurtmani O'zgartirgan Shaxs
                  </Typography>
                  <Typography variant='h6' mb={4}>
                    Nomi: {order?.updated_by?.first_name || 'admin'} {order?.updated_by?.last_name}
                  </Typography>
                  <Typography variant='h6' mb={4}>
                    Telefon Raqami: {order?.updated_by?.phone_number || 'N/A'}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Typography variant='h6' my={4}>
                Statusi:{' '}
                {order?.status === 'DONE' ? (
                  <Chip label='Yakunlangan' color='success' variant='outlined' />
                ) : (
                  <Chip label='Jarayonda' color='warning' />
                )}
              </Typography>
              <Typography variant='h6' mb={4}>
                Valyuta Kursi: {order?.currency_ratio?.ratio}
              </Typography>
              <Typography variant='h6' mb={4}>
                Jami Miqdori: {order?.quantity_sum}
              </Typography>
              <Typography variant='h6' mb={4}>
                Jami Summa So'mda: {order?.order_sum_uzs}
              </Typography>
              <Typography variant='h6' mb={4}>
                Jami Summa Dollarda: {order?.order_sum_usd}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ height: 650 }}>
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <DataGrid
                    columns={columns}
                    rows={finalData?.order_items?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)}
                    slots={{
                      pagination: CustomPagination
                    }}
                    pagination
                    pageSize={rowsPerPage}
                    sx={{ cursor: 'pointer' }}
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default CustomerOrderDetails

CustomerOrderDetails
