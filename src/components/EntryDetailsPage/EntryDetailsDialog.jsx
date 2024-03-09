import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography, Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import Icon from 'src/@core/components/icon'

const EntryDetailsDialog = ({ dialogOpen, onDialogClose, item }) => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'serial_number',
      headerName: 'Seriya Raqami',
      sortable: false,
      width: 250,
      renderCell: params => (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Typography>{params?.row?.serial_number || 'N/A'}</Typography>
          <Button color='secondary'>
            <Icon icon='tabler:download' />
          </Button>
        </div>
      )
    },

    {
      field: 'marking_number',
      headerName: 'Markirovka Raqami',
      sortable: false,
      width: 250,
      renderCell: params => (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Typography>{params?.row?.marking_number || 'N/A'}</Typography>
          <Button color='secondary'>
            <Icon icon='tabler:download' />
          </Button>
        </div>
      )
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
    </Dialog>
  )
}

export default EntryDetailsDialog
