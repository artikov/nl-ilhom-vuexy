import { useState } from 'react'

import { Card, Grid, CardHeader, CardContent, MenuItem, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import CustomTextField from 'src/@core/components/mui/text-field'
import ProductAcceptDialog from './ProductAcceptDialog'

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
]

const EntryInfoForm = () => {
  const [search, setSearch] = useState('')
  const [quantity, setQuantity] = useState({})
  const [price, setPrice] = useState({})
  const [sellingPrice, setSellingPrice] = useState({})
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [itemId, setItemId] = useState(null)

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

  const handleDialogOpen = id => {
    setItemId(id)
    setIsDialogOpen(true)
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
                  >
                    <MenuItem disabled value=''>
                      <em>Yetkazib Beruvchini Tanlang</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
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
                  >
                    <MenuItem disabled value=''>
                      <em>Omborxonani Tanlang</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
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
                  >
                    <MenuItem disabled value=''>
                      <em>Status</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
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
                    <CustomTextField
                      placeholder='Search'
                      fullWidth
                      value={search}
                      name='search'
                      onChange={({ target }) => onSearchChange(target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Button variant='contained' color='primary' fullWidth>
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
    </Grid>
  )
}

export default EntryInfoForm
