import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Card, Grid, CardHeader, CardContent, MenuItem, Button, CircularProgress } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import toast from 'react-hot-toast'

import CustomTextField from 'src/@core/components/mui/text-field'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import UpdateIdentitiesDialog from './UpdateIdentitiesDialog'
import Icon from 'src/@core/components/icon'

import { useGetSuppliersQuery } from 'src/store/slices/suppliersApiSlice'
import { useGetWarehousesQuery } from 'src/store/slices/warehousesApiSlice'
import { useGetProductsQuery } from 'src/store/slices/productsApiSlice'
import { useUpdateEntryMutation, useGetEntryQuery } from 'src/store/slices/warehouseIncomesApiSlice'
import { useDeleteWarehouseItemMutation } from 'src/store/slices/warehouseItemsApiSlice'

const EntryEditForm = ({ entryId }) => {
  const router = useRouter()
  const { data: entry, isLoading } = useGetEntryQuery(entryId)

  console.log(entry)

  const [rows, setRows] = useState([])

  const quantityObject = entry?.warehouse_items?.reduce((acc, item) => {
    acc[item.id] = item.quantity

    return acc
  }, {})

  const priceObject = entry?.warehouse_items?.reduce((acc, item) => {
    acc[item.id] = item.price

    return acc
  }, {})

  const [quantity, setQuantity] = useState({
    ...quantityObject
  })

  const [price, setPrice] = useState({
    ...priceObject
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [itemId, setItemId] = useState(null)
  const [selectedSupplier, setSelectedSupplier] = useState('')
  const [selectedWarehouse, setSelectedWarehouse] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedProduct, setSelectedProduct] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [itemIdentities, setItemIdentities] = useState([])
  const [newProducts, setNewProducts] = useState([])

  // console.log(rows)

  useEffect(() => {
    setRows(entry?.warehouse_items || [])
    setQuantity({ ...quantityObject })
    setPrice({ ...priceObject })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry])

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

  const [deleteWarehouseItem] = useDeleteWarehouseItemMutation()

  const [updateEntry, { isError, isLoading: entryUpdating }] = useUpdateEntryMutation()

  const columns = [
    { flex: 0.1, field: 'id', headerName: 'ID', width: 70 },
    {
      flex: 0.3,
      field: 'name',
      headerName: 'Nomi',
      minWidth: 230,
      valueGetter: params => params?.row?.product?.name || params?.row?.name
    },
    {
      field: 'quantity',
      headerName: 'Miqdori',
      sortable: false,
      minWidth: 200,
      renderCell: params => (
        <CustomTextField
          value={quantity[params.id] || ''}
          onChange={e => setQuantity(prevQuantity => ({ ...prevQuantity, [params.id]: e.target.value }))}
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
    setRows(updatedRows)
    deleteWarehouseItem(id)
  }

  const handleSaveIdentities = itemIds => {
    setItemIdentities(prev => [...prev, itemIds])
  }

  const handleAddProductToRow = () => {
    if (selectedProduct) {
      if (rows.some(row => row.id === selectedProduct.id || row.product.id === selectedProduct.id)) {
        toast.error('Bu mahsulot jadvalda mavjud', {
          position: 'top-center'
        })

        return
      }

      const newProduct = {
        ...selectedProduct,
        new: true
      }

      setNewProducts([...newProducts, selectedProduct])
      setRows([...rows, newProduct])
    }
    setSelectedProduct('')
  }

  const handleDialogOpen = id => {
    setItemId(id)
    setIsDialogOpen(true)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const submitDataFiltered = {
      ...(selectedSupplier && { supplier: selectedSupplier }),
      ...(selectedWarehouse && { warehouse: selectedWarehouse }),
      ...(selectedStatus && { status: selectedStatus }),

      warehouse_items: rows.map(row => {
        const quantityValue = parseInt(quantity[row.id], 10)
        const priceValue = parseInt(price[row.id], 10)

        const item_identities = itemIdentities
          .filter(item => item.id === row.id)
          .map(item => {
            const entries = Object.entries(item.serialNumber).map(([key, serial]) => ({
              id: key,
              serial_number: serial,
              marking_number: item.markingNumber[key]
            }))

            return entries
          })
          .flat()

        return {
          [row.new ? 'product' : 'id']: row.id,
          quantity: quantityValue,
          price: priceValue,
          ...(item_identities.length > 0 && { item_identities })
        }
      })

      // .filter(item => Object.keys(item).length > 1) // Filter out objects with only product key
    }

    console.log(submitDataFiltered)

    await updateEntry({ id: entryId, body: submitDataFiltered })

    if (!isError) {
      toast.success("Kirim ma'lumotlari muvaffaqiyatli saqlandi", {
        position: 'top-center'
      })

      router.push('/inventory/entries/' + entryId)
    }
  }

  return (
    <Grid container spacing={6}>
      <UpdateIdentitiesDialog
        dialogOpen={isDialogOpen}
        onDialogClose={setIsDialogOpen}
        itemId={itemId}
        quantity={quantity}
        onSave={handleSaveIdentities}
        warehouseItems={entry?.warehouse_items}
      />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Kirim ma'lumotlari" />
              <CardContent>
                <form onSubmit={e => e.preventDefault()}>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <CustomTextField
                        select
                        fullWidth
                        defaultValue={entry?.supplier?.id || ''}
                        label='Yetkazib Beruvchi'
                        id='custom-select'
                        SelectProps={{ displayEmpty: true }}
                        onChange={({ target }) => setSelectedSupplier(target.value)}
                      >
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
                        defaultValue={entry?.warehouse?.id || ''}
                        label='Omborxona'
                        id='custom-select'
                        fullWidth
                        SelectProps={{ displayEmpty: true }}
                        onChange={({ target }) => setSelectedWarehouse(target.value)}
                      >
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
                        defaultValue={entry?.status || ''}
                        label='Status'
                        id='custom-select'
                        fullWidth
                        SelectProps={{ displayEmpty: true }}
                        onChange={({ target }) => setSelectedStatus(target.value)}
                      >
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
                          disabled={selectedProduct === '' || selectedProduct === null}
                          fullWidth
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
                <Button variant='contained' color='primary' onClick={handleSubmit} disabled={entryUpdating}>
                  O'zgartishlarni Saqlash
                  {entryUpdating && <CircularProgress size={20} />}
                </Button>
              </Grid>
              <Grid item>
                <Link href={'/inventory/entries/' + entryId}>
                  <Button variant='tonal' color='error'>
                    Bekor Qilish
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  )
}

export default EntryEditForm
