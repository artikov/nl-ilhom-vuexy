import { useState } from 'react'

import { Card, Grid, CardHeader, CardContent, MenuItem, Button, CircularProgress } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import CustomTextField from 'src/@core/components/mui/text-field'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import ProductAcceptDialog from './ProductAcceptDialog'

import { useGetSuppliersQuery } from 'src/store/slices/suppliersApiSlice'
import { useGetWarehousesQuery } from 'src/store/slices/warehousesApiSlice'
import { useGetProductsQuery } from 'src/store/slices/productsApiSlice'

const EntryInfoForm = () => {
  const [rows, setRows] = useState([])
  const [search, setSearch] = useState('')
  const [quantity, setQuantity] = useState({})
  const [price, setPrice] = useState({})
  const [sellingPrice, setSellingPrice] = useState({})
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [itemId, setItemId] = useState(null)
  const [selectedSupplier, setSelectedSupplier] = useState('')
  const [selectedWarehouse, setSelectedWarehouse] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedProduct, setSelectedProduct] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  console.log('selectedSupplier', selectedSupplier)
  console.log('selectedWarehouse', selectedWarehouse)
  console.log('selectedStatus', selectedStatus)
  console.log('selectedProduct', selectedProduct)
  console.log('search', search)

  const person_type = ''
  const responsible = ''

  const { data: suppliers } = useGetSuppliersQuery({
    person_type
  })

  const { data: warehouses } = useGetWarehousesQuery({
    responsible
  })

  const { data: products, isLoading: productsLoading } = useGetProductsQuery({
    search
  })

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nomi', width: 230 },
    {
      field: 'quantity',
      headerName: 'Miqdori',
      sortable: false,
      width: 200,
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
      width: 200,
      renderCell: params => (
        <CustomTextField
          value={price[params.id] || ''}
          onChange={e => setPrice({ ...price, [params.id]: e.target.value })}
        />
      )
    },
    {
      field: 'sellingPrice',
      headerName: 'Sotish Narxi',
      sortable: false,
      width: 200,
      renderCell: params => (
        <CustomTextField
          value={sellingPrice[params.id] || ''}
          onChange={e => setSellingPrice({ ...sellingPrice, [params.id]: e.target.value })}
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
          Edit
        </Button>
      )
    }
  ]

  const handleAddProductToRow = () => {
    if (selectedProduct) {
      // Create a new array with the existing rows and the selected product
      const updatedRows = [...rows, selectedProduct]
      setRows(updatedRows) // Assuming setRows is a state update function
    }
  }

  const handleDialogOpen = id => {
    setItemId(id)
    setIsDialogOpen(true)
  }

  const handleSubmit = () => {
    const submitData = {
      supplier: selectedSupplier,
      warehouse: selectedWarehouse,
      status: selectedStatus,
      products: rows.map(row => ({
        product: row.id,
        quantity: quantity[row.id],
        price: price[row.id],
        selling_price: sellingPrice[row.id]
      }))
    }

    console.log(submitData)
  }

  return (
    <Grid container spacing={6}>
      <ProductAcceptDialog dialogOpen={isDialogOpen} onDialogClose={setIsDialogOpen} itemId={itemId} />
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
                      options={products?.results}
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
                    <Button variant='contained' color='primary' fullWidth onClick={handleAddProductToRow}>
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
            <Button variant='tonal' color='error'>
              Bekor Qilish
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default EntryInfoForm
