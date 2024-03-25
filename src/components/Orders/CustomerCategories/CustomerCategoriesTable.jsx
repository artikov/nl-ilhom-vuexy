import { useState } from 'react'

import toast from 'react-hot-toast'

import { Card, CardContent, Drawer, Grid, MenuItem, Box, Button, Pagination } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import Icon from 'src/@core/components/icon'

import CustomTextField from 'src/@core/components/mui/text-field'

import CustomerCategoriesDrawer from './CustomerCategoriesDrawer'

import { useDeleteClientsCategoryMutation } from 'src/store/slices/clientsCategoriesApiSlice'

import { rows } from 'src/@fake-db/table/static-data'

const CustomerCategoriesTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [itemId, setItemId] = useState(null)

  const [deleteClientsCategory, { isLoading: isDeleting }] = useDeleteClientsCategoryMutation()

  const toggleDrawer = open => () => {
    setDrawerOpen(open)
    setItemId(null)
  }

  const finalData = data ? data : rows
  const pageCount = Math.ceil(finalData.length / rowsPerPage)

  const handleDelete = async id => {
    await deleteClientsCategory(id)
    toast.success('Categoriya olib tashlandi', {
      position: 'top-center'
    })
  }

  const handleEdit = id => {
    setDrawerOpen(true)
    setItemId(id)
  }

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  const CustomPagination = () => (
    <Pagination
      count={pageCount}
      page={currentPage}
      onChange={handlePageChange}
      variant='outlined'
      shape='rounded'
      color='primary'
    />
  )

  const columns = [
    {
      flex: 0.1,
      field: 'id',
      maxWidth: 80,
      headerName: 'ID'
    },
    {
      flex: 0.35,
      minWidth: 200,
      field: 'name',
      headerName: 'Kategoriya Nomi'
    },

    // Edit button column
    {
      flex: 0.1,
      field: 'edit',
      maxWidth: 100,
      headerName: '',
      sortable: false,
      renderCell: params => (
        <Button onClick={() => handleEdit(params.row.id)}>
          <Icon icon='tabler:edit' />
        </Button>
      )
    },

    // Delete button column
    {
      flex: 0.1,
      field: 'delete',
      maxWidth: 100,
      headerName: '',
      sortable: false,
      renderCell: params => (
        <Button color='error' onClick={() => handleDelete(params.row.id)} disabled={isDeleting}>
          <Icon icon='tabler:trash' />
        </Button>
      )
    }
  ]

  const CategoriesDrawer = <CustomerCategoriesDrawer toggleDrawer={toggleDrawer} itemId={itemId} />

  return (
    <Card>
      <div>
        <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer(false)}>
          {CategoriesDrawer}
        </Drawer>
      </div>
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} marginBottom={6}>
            <Grid container spacing={6} justifyContent={'end'}>
              <Grid item xs={12} md={'auto'}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue='10'
                  id='custom-select'
                  SelectProps={{ displayEmpty: true }}
                  onChange={({ target }) => setRowsPerPage(target.value)}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item xs={12} md={'auto'}>
                <Button variant='contained' color='primary' fullWidth onClick={toggleDrawer(true)}>
                  {`Mijoz Kategoriyasini Qo'shish`}
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ height: 650 }}>
              <DataGrid
                initialState={{
                  sorting: {
                    sortModel: [{ field: 'id', sort: 'asc' }]
                  }
                }}
                columns={columns}
                rows={finalData?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)}
                slots={{
                  pagination: CustomPagination
                }}
                pagination
                pageSize={rowsPerPage}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CustomerCategoriesTable
