import { useState } from 'react'

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Checkbox,
  Typography,
  Grid,
  FormControlLabel,
  FormGroup
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null }
]

const ProductAcceptDialog = ({ dialogOpen, onDialogClose, itemId }) => {
  const [serialNumber, setSerialNumber] = useState({})
  const [markingNumber, setMarkingNumber] = useState({})
  const [generateSerialNumber, setGenerateSerialNumber] = useState(false)
  const [generateMarkingNumber, setGenerateMarkingNumber] = useState(false)

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
      field: 'generateSerialNumber',
      headerName: 'Generate',
      width: 150,
      renderCell: params => (
        <Checkbox
          checked={generateSerialNumber[params.id] || false}
          onChange={e =>
            setGenerateSerialNumber({
              ...generateSerialNumber,
              [params.id]: e.target.checked
            })
          }
        />
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
    },
    {
      field: 'generateMarkingNumber',
      headerName: 'Generate',
      width: 150,
      renderCell: params => (
        <Checkbox
          checked={generateMarkingNumber[params.id] || false}
          onChange={e =>
            setGenerateMarkingNumber({
              ...generateMarkingNumber,
              [params.id]: e.target.checked
            })
          }
        />
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
          <Grid item xs={6}>
            <Typography variant='h4'>Seriya / Markirovka raqamlari</Typography>
          </Grid>
          <Grid item xs={6} textAlign='right'>
            <Button variant='contained' color='secondary' onClick={handleClose}>
              X
            </Button>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Box height={400}>
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
        </Box>
      </DialogContent>
      <DialogActions className='dialog-actions-dense'>
        <Grid container spacing={6} alignItems={'center'}>
          <Grid item xs={12} md={6}>
            <FormGroup row>
              <FormControlLabel
                label='Seriya Raqam Generatsiya Qilish'
                control={<Checkbox checked={true} onChange={handleClose} name='controlled' />}
              />
              <FormControlLabel
                label='Markirovka Raqam Generatsiya Qilish'
                control={<Checkbox checked={true} onChange={handleClose} name='controlled' />}
              />
            </FormGroup>
          </Grid>
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

export default ProductAcceptDialog
