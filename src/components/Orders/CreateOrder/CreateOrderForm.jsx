import { useState } from 'react'
import Link from 'next/link'

import toast from 'react-hot-toast'

import { Grid, Card, CardHeader, CardContent, MenuItem, Button, CircularProgress } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import Icon from 'src/@core/components/icon'
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'

import CreateOrderDialog from './CreateOrderDialog'

import { useGetClientsQuery } from 'src/store/slices/clientsApiSlice'
import { useGetProductsQuery } from 'src/store/slices/productsApiSlice'
import { useCreateOrderMutation } from 'src/store/slices/ordersApiSlice'

const CreateOrderForm = () => {
  const [rows, setRows] = useState([])
  const [quantity, setQuantity] = useState({})
  const [price, setPrice] = useState({})
  const [selectedClient, setSelectedClient] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedProduct, setSelectedProduct] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [itemId, setItemId] = useState('')
  const [itemIdentities, setItemIdentities] = useState([])

  const { data: clients } = useGetClientsQuery({ category: '' })
  const { data: products, isLoading: productsLoading } = useGetProductsQuery({ category: '' })
  const [createOrder] = useCreateOrderMutation()

  const columns = [
    { flex: 0.1, field: 'id', headerName: 'ID', width: 70 },
    { flex: 0.3, field: 'name', headerName: 'Nomi', minWidth: 230 },
    {
      field: 'quantity',
      headerName: 'Miqdori',
      sortable: false,
      minWidth: 200,
      renderCell: params => (
        <CustomTextField
          value={quantity[params.id] || ''}
          onChange={e => setQuantity({ ...quantity, [params.id]: e.target.value })}
        />
      )
    },
    {
      field: 'price',
      headerName: 'Narxi',
      sortable: false,
      minWidth: 200,
      renderCell: params => (
        <CustomTextField
          value={price[params.id] || ''}
          onChange={e => setPrice({ ...price, [params.id]: e.target.value })}
        />
      )
    },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      width: 100,
      renderCell: params => (
        <Button variant='contained' onClick={() => handleDialogOpen(params.id)} fullWidth>
          <Icon icon='tabler:qrcode' />
        </Button>
      )
    },
    {
      field: 'delete',
      headerName: '',
      sortable: false,
      width: 100,
      renderCell: params => (
        <Button variant='outlined' color='error' onClick={() => handleDelete(params.id)} fullWidth>
          <Icon icon='tabler:trash' />
        </Button>
      )
    }
  ]

  const handleAddProductToRow = () => {
    if (selectedProduct) {
      if (rows.some(row => row.id === selectedProduct.id)) {
        toast.error('Bu mahsulot jadvalda mavjud!', {
          position: 'top-center'
        })

        return
      }

      // Create a new array with the existing rows and the selected product
      const updatedRows = [...rows, selectedProduct]
      setRows(updatedRows) // Assuming setRows is a state update function
    }
  }

  const handleSubmit = () => {
    const order = {
      client: selectedClient,
      status: selectedStatus
    }

    console.log(order)
    createOrder({ order })
  }

  const handleDelete = id => {
    const updatedRows = rows.filter(row => row.id !== id)
    setRows(updatedRows)
  }

  const handleDialogOpen = id => {
    setItemId(id)
    setIsDialogOpen(true)
  }

  const handleSaveIdentities = itemIds => {
    setItemIdentities(prev => [...prev, itemIds])
  }

  return (
    <Grid container spacing={6}>
      <CreateOrderDialog
        dialogOpen={isDialogOpen}
        onDialogClose={setIsDialogOpen}
        itemId={itemId}
        quantity={quantity}
        onSave={handleSaveIdentities}
      />
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Buyurtma ma'lumotlari" />
          <CardContent>
            <form onSubmit={e => e.preventDefault()}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <CustomTextField
                    select
                    defaultValue=''
                    label='Mijoz'
                    id='custom-select'
                    fullWidth
                    SelectProps={{ displayEmpty: true }}
                    value={selectedClient}
                    onChange={({ target }) => setSelectedClient(target.value)}
                  >
                    <MenuItem disabled value=''>
                      <em>Mijozni Tanlang</em>
                    </MenuItem>
                    {clients?.results?.map(client => (
                      <MenuItem key={client.id} value={client.id}>
                        {client.full_name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    select
                    defaultValue=''
                    label='Status'
                    id='custom-select'
                    fullWidth
                    SelectProps={{ displayEmpty: true }}
                    value={selectedStatus}
                    onChange={({ target }) => setSelectedStatus(target.value)}
                  >
                    <MenuItem disabled value=''>
                      <em>Status</em>
                    </MenuItem>
                    <MenuItem value={'in_progress'}>Jarayonda</MenuItem>
                    <MenuItem value={'done'}>Yakunlangan</MenuItem>
                  </CustomTextField>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Grid container spacing={5}>
                  <Grid item xs={12} md={8}>
                    <CustomAutocomplete
                      open={isSearchOpen}
                      options={products?.results || []}
                      loading={productsLoading}
                      onOpen={() => setIsSearchOpen(true)}
                      onClose={() => setIsSearchOpen(false)}
                      id='autocomplete-asynchronous-request'
                      getOptionLabel={option => option.name || ''}
                      isOptionEqualToValue={(option, value) => option.name === value.name}
                      onChange={(e, value) => setSelectedProduct(value)}
                      renderInput={params => (
                        <CustomTextField
                          {...params}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {productsLoading ? <CircularProgress size={20} /> : null}
                                {params.InputProps.endAdornment}
                              </>
                            )
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Button
                      variant='contained'
                      color='primary'
                      fullWidth
                      disabled={selectedProduct === '' || selectedProduct === null}
                      onClick={handleAddProductToRow}
                    >
                      {`Mahsulotni Jadvalga Qo'shish`}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} height={400}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 }
                    }
                  }}
                  pageSizeOptions={[5, 10]}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={4}>
          <Grid item>
            <Button variant='contained' color='primary' onClick={handleSubmit}>
              Saqlash
            </Button>
          </Grid>
          <Grid item>
            <Link href='./orders'>
              <Button variant='tonal' color='error'>
                Bekor Qilish
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CreateOrderForm
