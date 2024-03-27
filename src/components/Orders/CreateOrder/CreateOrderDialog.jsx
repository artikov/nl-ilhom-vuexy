import { useState, useEffect } from 'react'

import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography, Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'

const CreateOrderDialog = ({ dialogOpen, onDialogClose, itemId, quantity, onSave }) => {
  const [serialNumber, setSerialNumber] = useState({})
  const [markingNumber, setMarkingNumber] = useState({})

  // Get the quantity for the specified category ID
  const amount = parseInt(quantity[itemId])

  // Create an array with the specified number of items
  const itemsArray = Array.from({ length: amount }, (_, index) => ({
    id: index + 1, // Index starts from 1
    serialNumber: '',
    markingNumber: ''
  }))

  useEffect(() => {
    setSerialNumber({})
    setMarkingNumber({})
  }, [itemId])

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'serialNumber',
      headerName: 'Seriya Raqami',
      sortable: false,
      width: 250,
      renderCell: params => (
        <>
          <CustomTextField
            value={serialNumber[params.id] || ''}
            onChange={e => setSerialNumber({ ...serialNumber, [params.id]: e.target.value })}
          />
          <Button color='secondary'>
            <Icon icon='tabler:download' />
          </Button>
        </>
      )
    },

    {
      field: 'markingNumber',
      headerName: 'Markirovka Raqami',
      sortable: false,
      width: 250,
      renderCell: params => (
        <>
          <CustomTextField
            value={markingNumber[params.id] || ''}
            onChange={e => setMarkingNumber({ ...markingNumber, [params.id]: e.target.value })}
          />
          <Button color='secondary'>
            <Icon icon='tabler:download' />
          </Button>
        </>
      )
    }
  ]

  const handleClose = () => {
    onDialogClose(false)
  }

  const handleSave = () => {
    // Convert serialNumber and markingNumber values to integers
    const intSerialNumber = {}
    const intMarkingNumber = {}

    for (const id in serialNumber) {
      if (serialNumber.hasOwnProperty(id)) {
        intSerialNumber[id] = parseInt(serialNumber[id], 10) || 0
      }
    }

    for (const id in markingNumber) {
      if (markingNumber.hasOwnProperty(id)) {
        intMarkingNumber[id] = parseInt(markingNumber[id], 10) || 0
      }
    }

    const itemIdentities = { id: itemId, serialNumber: intSerialNumber, markingNumber: intMarkingNumber }

    onSave(itemIdentities)
    onDialogClose(false)
  }

  return (
    <Dialog open={dialogOpen} onClose={handleClose} aria-labelledby='form-dialog-title' maxWidth={'lg'}>
      <DialogTitle id='form-dialog-title'>
        <Grid container alignItems={'center'}>
          <Grid item xs={10}>
            <Typography variant='h4'>Seriya / Markirovka raqamlari</Typography>
          </Grid>
          <Grid item xs={2} textAlign='right'>
            <Button variant='contained' color='secondary' onClick={handleClose}>
              X
            </Button>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Box height={400}>
          <DataGrid
            rows={itemsArray}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 }
              }
            }}
            pageSizeOptions={[5, 10]}
          />
        </Box>
      </DialogContent>
      <DialogActions className='dialog-actions-dense'>
        <Grid container spacing={6} alignItems={'center'}>
          <Grid item xs={12}>
            <Grid container spacing={6} justifyContent={'end'}>
              <Grid item>
                <Button variant='contained' onClick={handleSave}>
                  Saqlash
                </Button>
              </Grid>
              <Grid item>
                <Button variant='tonal' color='error' onClick={handleClose}>
                  Bekor Qilish
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  )
}

export default CreateOrderDialog
