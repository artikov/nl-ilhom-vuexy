import { useState } from 'react'

import toast from 'react-hot-toast'

import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'

import {
  useAddClientsCategoryMutation,
  useUpdateClientsCategoryMutation,
  useGetClientsCategoryQuery
} from 'src/store/slices/clientsCategoriesApiSlice'

const CustomerCategoriesDrawer = ({ toggleDrawer, itemId }) => {
  const [categoryName, setCategoryName] = useState('')

  const { data } = useGetClientsCategoryQuery(itemId) // need to find a way to conditionally get data

  const [addClientsCategory, { isLoading: isAdding }] = useAddClientsCategoryMutation()
  const [updateClientsCategory, { isLoading: isUpdating }] = useUpdateClientsCategoryMutation()

  const handleSave = async () => {
    if (itemId) {
      await updateClientsCategory({ id: itemId, name: categoryName })
      toast.success('Kategoriya muvaffaqiyatli tahrirlandi', {
        position: 'top-center'
      })
    } else {
      await addClientsCategory({ name: categoryName })
      toast.success("Kategoriya muvaffaqiyatli qo'shildi", {
        position: 'top-center'
      })
    }
    toggleDrawer(false)
  }

  return (
    <Box sx={{ width: 'auto', margin: 6 }} role='presentation'>
      <Grid container justifyContent={'space-between'} marginY={4}>
        {itemId ? (
          <Typography variant='h3'>Mijoz Kategoriyasini Tahrirlash</Typography>
        ) : (
          <Typography variant='h3'>Mijoz Kategoriyasini Qo'shish</Typography>
        )}
        <Button variant='tonal' color='secondary' onClick={toggleDrawer(false)}>
          X
        </Button>
      </Grid>
      <Divider />
      <Grid container spacing={6} marginY={4}>
        <Grid item xs={12}>
          <CustomTextField
            label={`Kategoriya Nomi`}
            placeholder={data?.name || `Kategoriya Nomi`}
            name='categroyName'
            value={categoryName}
            onChange={({ target }) => setCategoryName(target.value)}
            fullWidth
          ></CustomTextField>
        </Grid>
      </Grid>
      <Grid container spacing={6} marginY={4}>
        <Grid item onClick={toggleDrawer(false)}>
          <Button variant='contained' onClick={handleSave} disabled={isAdding || isUpdating}>
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

export default CustomerCategoriesDrawer
