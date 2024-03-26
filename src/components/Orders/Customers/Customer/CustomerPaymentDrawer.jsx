import { useState, useEffect } from 'react'

import toast from 'react-hot-toast'

import { Box, Button, Divider, Grid, Typography, MenuItem } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'

import {
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useGetPaymentQuery
} from 'src/store/slices/paymentsApiSlice'

const CustomerPaymentDrawer = ({ toggleDrawer, itemId, clientId }) => {
  const [paymentAmount, setPaymentAmount] = useState('')
  const [exchangeRate, setExchangeRate] = useState('')
  const [description, setDescription] = useState('')
  const [selectedPaymentType, setSelectedPaymentType] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState('')

  const { data: payment, isLoading } = useGetPaymentQuery(itemId) // need to find a way to conditionally get data

  console.log(payment)

  const [createPayment, { isLoading: isAdding }] = useCreatePaymentMutation()
  const [updatePayment, { isLoading: isUpdating, isError: updateError }] = useUpdatePaymentMutation()

  const handleSave = async () => {
    const newPayment = {
      payment_type: selectedPaymentType,
      currency: selectedCurrency,
      currency_ratio: exchangeRate,
      price: paymentAmount,
      note: description,
      client: clientId
    }

    // Filtering out keys with empty values
    const filteredNewPayment = Object.fromEntries(Object.entries(newPayment).filter(([_, value]) => value !== ''))

    if (itemId) {
      const updatedPayment = Object.fromEntries(
        Object.entries(newPayment).filter(([key, value]) => key !== 'client' && value !== '')
      )

      await updatePayment({ id: itemId, body: updatedPayment })
      if (updateError) {
        toast.error("To'lovni tahrirlashda xatolik yuz berdi", {
          position: 'top-center'
        })
        console.log(updateError)

        return
      }
      toast.success("To'lov muvaffaqiyatli tahrirlandi", {
        position: 'top-center'
      })
    } else {
      await createPayment(filteredNewPayment)
      toast.success("To'lov muvaffaqiyatli qo'shildi", {
        position: 'top-center'
      })
    }
    toggleDrawer(false)
  }

  return (
    <Box sx={{ width: '450px', margin: 6 }} role='presentation'>
      <Grid container justifyContent={'space-between'} marginY={4}>
        {itemId ? (
          <Typography variant='h3'>To'lovni Tahrirlash</Typography>
        ) : (
          <Typography variant='h3'>To'lov Qo'shish</Typography>
        )}
        <Button variant='tonal' color='secondary' onClick={toggleDrawer(false)}>
          X
        </Button>
      </Grid>
      <Divider />
      <Grid container spacing={6} marginY={4}>
        <Grid item xs={12}>
          <CustomTextField
            select
            defaultValue={payment?.payment_type || ''}
            id='custom-select'
            fullWidth
            label={`To'lov Turi`}
            SelectProps={{ displayEmpty: true }}
            onChange={({ target }) => setSelectedPaymentType(target.value)}
          >
            <MenuItem disabled value=''>
              <em>To'lov Turi</em>
            </MenuItem>

            <MenuItem value='CASH'>Naxd</MenuItem>
            <MenuItem value='TRANSFER'>O'tkazma</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            select
            defaultValue={payment?.currency || ''}
            id='custom-select'
            fullWidth
            label={`Valyuta turi`}
            SelectProps={{ displayEmpty: true }}
            onChange={({ target }) => setSelectedCurrency(target.value)}
          >
            <MenuItem disabled value=''>
              <em>Valyuta</em>
            </MenuItem>

            <MenuItem value='UZS'>So'm</MenuItem>
            <MenuItem value='USD'>Dollar</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            label={`To'lov Summasi`}
            placeholder={payment?.price.toString() || `To'lov Summasi`}
            name='paymentAmount'
            value={paymentAmount}
            onChange={({ target }) => setPaymentAmount(target.value)}
            fullWidth
          ></CustomTextField>
        </Grid>
        {selectedCurrency === 'USD' && (
          <Grid item xs={12}>
            <CustomTextField
              label={`Valyuta Kursi`}
              placeholder={payment?.currency_ratio.toString() || `Valyuta Kursi`}
              name='exchangeRate'
              value={exchangeRate}
              onChange={({ target }) => setExchangeRate(target.value)}
              fullWidth
            ></CustomTextField>
          </Grid>
        )}
        <Grid item xs={12}>
          <CustomTextField
            label={`Izoh`}
            placeholder={payment?.note || `Izoh`}
            name='description'
            value={description}
            onChange={({ target }) => setDescription(target.value)}
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

export default CustomerPaymentDrawer
