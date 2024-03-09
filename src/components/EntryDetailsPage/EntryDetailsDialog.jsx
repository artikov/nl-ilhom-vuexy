import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography, Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import Icon from 'src/@core/components/icon'

const EntryDetailsDialog = ({ dialogOpen, onDialogClose, item }) => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'serialNumber',
      headerName: 'Seriya Raqami',
      sortable: false,
      width: 250,
      renderCell: params => (
        <>
          <Typography>{params?.serial_number || 'None'}</Typography>
          <Button color='secondary'>
            <Icon icon='tabler:download' />
          </Button>
        </>
      )
    },

    {
      field: 'marking_number',
      headerName: 'Markirovka Raqami',
      sortable: false,
      width: 250
    }
  ]

  const handleClose = () => {
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
            rows={item?.item_identities}
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
          <Grid item xs={12} md={6}></Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={6} justifyContent={'end'}>
              <Grid item>
                <Button variant='contained' onClick={handleClose}>
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

export default EntryDetailsDialog
