import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Card, Grid, CardHeader, CardContent, MenuItem, Button, CircularProgress } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import toast from 'react-hot-toast'

import CustomTextField from 'src/@core/components/mui/text-field'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import ProductAcceptDialog from './ProductAcceptDialog'
import Icon from 'src/@core/components/icon'

import { useGetSuppliersQuery } from 'src/store/slices/suppliersApiSlice'
import { useGetWarehousesQuery } from 'src/store/slices/warehousesApiSlice'
import { useGetProductsQuery } from 'src/store/slices/productsApiSlice'
import { useAddEntryMutation } from 'src/store/slices/warehouseIncomesApiSlice'

const EntryInfoForm = () => {
  const router = useRouter()
  const [rows, setRows] = useState([])
  const [quantity, setQuantity] = useState({})
  const [price, setPrice] = useState({})
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [itemId, setItemId] = useState(null)
  const [selectedSupplier, setSelectedSupplier] = useState('')
  const [selectedWarehouse, setSelectedWarehouse] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedProduct, setSelectedProduct] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [itemIdentities, setItemIdentities] = useState([])

  const person_type = ''
  const responsible = ''
  const search = ''

  const { data: suppliers } = useGetSuppliersQuery({
    person_type
  })

  const { data: warehouses } = useGetWarehousesQuery({
    responsible
  })

  const { data: products, isLoading: productsLoading } = useGetProductsQuery({
    search
  })

  const [addEntry, { isError }] = useAddEntryMutation()

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
      headerName: 'Kirim Narxi',
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

  const handleDelete = id => {
    const updatedRows = rows.filter(row => row.id !== id)
    toast.success('Mahsulot olib tashlandi', {
      position: 'top-center'
    })

    setRows(updatedRows)
  }

  const handleSaveIdentities = itemIds => {
    setItemIdentities(prev => [...prev, itemIds])
  }

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

  const handleDialogOpen = id => {
    setItemId(id)
    setIsDialogOpen(true)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const submitData = {
      supplier: selectedSupplier,
      warehouse: selectedWarehouse,
      status: selectedStatus,
      warehouse_items: rows.map(row => ({
        product: row.id,
        quantity: parseInt(quantity[row.id], 10),
        price: parseInt(price[row.id], 10),
        item_identities: itemIdentities
          .filter(item => item.id === row.id)
          .map(item => {
            const entries = Object.entries(item.serialNumber).map(([key, serial]) => ({
              serial_number: serial,
              marking_number: item.markingNumber[key]
            }))

            return entries
          })
          .flat()
      }))
    }

    await addEntry(submitData)

    if (!isError) {
      router.push('./entries')
    }
  }

  return (
    <Grid container spacing={6}>
      <ProductAcceptDialog
        dialogOpen={isDialogOpen}
        onDialogClose={setIsDialogOpen}
        itemId={itemId}
        quantity={quantity}
        onSave={handleSaveIdentities}
      />
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Kirim ma'lumotlari" />
          <CardContent>
            <form onSubmit={e => e.preventDefault()}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <CustomTextField
                    select
                    defaultValue=''
                    label='Yetkazib Beruvchi'
                    id='custom-select'
                    fullWidth
                    SelectProps={{ displayEmpty: true }}
                    value={selectedSupplier}
                    onChange={({ target }) => setSelectedSupplier(target.value)}
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
                <Grid item xs={12}>
                  <CustomTextField
                    select
                    defaultValue=''
                    label='Omborxona'
                    id='custom-select'
                    fullWidth
                    SelectProps={{ displayEmpty: true }}
                    value={selectedWarehouse}
                    onChange={({ target }) => setSelectedWarehouse(target.value)}
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
              Qabul Qilish
            </Button>
          </Grid>
          <Grid item>
            <Link href='./entries'>
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

export default EntryInfoForm
