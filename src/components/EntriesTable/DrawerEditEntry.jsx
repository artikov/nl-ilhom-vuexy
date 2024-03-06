import { useState } from 'react'

import {
  Box,
  Grid,
  Button,
  Divider,
  Typography,
  MenuItem,
  CircularProgress,
  RadioGroup,
  Radio,
  FormControlLabel
} from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'

import { useGetEntryQuery, useUpdateEntryMutation } from 'src/store/slices/warehouseIncomesApiSlice'
import { useGetWarehousesQuery } from 'src/store/slices/warehousesApiSlice'
import { useGetSuppliersQuery } from 'src/store/slices/suppliersApiSlice'
import { borderTop } from '@mui/system'

const DrawerEditEntry = ({ toggleDrawer, itemId }) => {
  const [body, setBody] = useState({
    warehouse: '',
    supplier: '',
    status: ''
  })
  const [products, setProducts] = useState([])

  const responsible = ''
  const person_type = ''

  const [updateEntry, { isError }] = useUpdateEntryMutation()
  const { data: warehouses, isLoading: warehousesLoading } = useGetWarehousesQuery({ responsible })
  const { data: suppliers, isLoading: suppliersLoading } = useGetSuppliersQuery({ person_type })
  const { data: entry, isLoading } = useGetEntryQuery(itemId)

  const handleChange = (e, productId) => {
    const newValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    if (e.target.name !== 'quantity' && e.target.name !== 'input_price') {
      setBody(prevBody => ({
        ...prevBody,
        [e.target.name]: newValue
      }))
    } else {
      // Check if the product already exists in the array
      const existingProductIndex = products.findIndex(product => product.id === productId)

      if (existingProductIndex !== -1) {
        // Update the existing product in the array
        const updatedProducts = [...products]
        updatedProducts[existingProductIndex] = {
          ...updatedProducts[existingProductIndex],
          id: productId,
          quantity:
            e.target.name === 'quantity' ? parseInt(newValue, 10) : updatedProducts[existingProductIndex].quantity,
          input_price:
            e.target.name === 'input_price' ? parseInt(newValue, 10) : updatedProducts[existingProductIndex].input_price
        }

        setProducts(updatedProducts)
      } else {
        // Create a new product object with id, quantity, and price
        const newProduct = {
          id: productId,
          quantity:
            e.target.name === 'quantity'
              ? parseInt(newValue, 10)
              : entry?.warehouse_items?.find(item => item.id === productId).quantity,
          input_price:
            e.target.name === 'input_price'
              ? parseInt(newValue, 10)
              : entry?.warehouse_items?.find(item => item.id === productId).input_price
        }

        // Add the new product to the products array
        setProducts(prevProducts => [...prevProducts, newProduct])
      }
    }
  }

  const handleSave = () => {
    let updateData = {
      warehouse: body.warehouse || entry?.warehouse?.id,
      supplier: body.supplier || entry?.supplier?.id,
      status: body.status || entry?.status,
      warehouse_items: products
    }

    updateEntry({ id: itemId, body: updateData })
  }

  return (
    <Box sx={{ maxWidth: '400px', margin: 6 }} role='presentation'>
      <Grid container justifyContent={'space-between'} marginY={4}>
        <Typography variant='h3'>Kirimni O'zgartirish</Typography>
        <Button variant='tonal' color='secondary' onClick={toggleDrawer(false)}>
          X
        </Button>
      </Grid>
      <Divider />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={6} marginY={4}>
          <Grid item xs={12}>
            <CustomTextField
              select
              fullWidth
              name='category'
              onChange={handleChange}
              defaultValue={entry?.warehouse?.id || ''}
              id='custom-select'
              label={`Omborxonani Tanlang`}
              SelectProps={{ displayEmpty: true }}
            >
              {warehousesLoading ? (
                <CircularProgress />
              ) : (
                warehouses?.results?.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))
              )}
            </CustomTextField>
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              select
              fullWidth
              name='brand'
              onChange={handleChange}
              defaultValue={entry?.supplier?.id || ''}
              id='custom-select'
              label={`Yetkazib Beruvchini Tanlang`}
              SelectProps={{ displayEmpty: true }}
            >
              {suppliersLoading ? (
                <CircularProgress />
              ) : (
                suppliers?.results?.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))
              )}
            </CustomTextField>
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12} sm={6}>
              <Typography>Status</Typography>
              <RadioGroup
                row
                aria-label='controlled'
                name='isActive'
                defaultValue={entry?.status}
                onChange={handleChange}
              >
                <FormControlLabel value={'done'} control={<Radio />} label='Complete' />
                <FormControlLabel value={'in_progress'} control={<Radio />} label='In Progress' />
              </RadioGroup>
            </Grid>
          </Grid>
          {entry?.warehouse_items?.map(item => (
            <Grid key={item.id} item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    fullWidth
                    name='quantity'
                    label={`${item?.product?.name} soni`}
                    defaultValue={item?.quantity || ''}
                    onChange={e => handleChange(e, item?.id)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    fullWidth
                    name='input_price'
                    label={`${item?.product?.name} kirim narxi`}
                    defaultValue={item?.input_price || ''}
                    onChange={e => handleChange(e, item?.id)}
                  />
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      )}
      <Grid container spacing={6} marginY={4}>
        <Grid item onClick={toggleDrawer(false)}>
          <Button variant='contained' onClick={handleSave}>
            Saqlash
          </Button>
        </Grid>
        <Grid item>
          <Button variant='tonal' color='error' onClick={toggleDrawer(false)}>
            Bekor Qilish
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DrawerEditEntry
