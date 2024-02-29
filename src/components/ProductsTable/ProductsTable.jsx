/* eslint-disable lines-around-comment */
import { useState } from 'react'
import Link from 'next/link'

import { Card, Drawer, Box, Grid, MenuItem, CardContent, Button, Pagination, Chip } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'

import CustomTextField from 'src/@core/components/mui/text-field'
import ProductFilters from './ProductFilters'
import DrawerEditProduct from './DrawerEditProduct'

import { rows } from 'src/@fake-db/table/static-data'

const ProductsTable = ({
  data,
  handleDeleteApi,
  onCategoryChange,
  onBrandChange,
  onActiveChange,
  onSearchChange,
  search,
  dataWithoutQuery
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [editDrawerOpen, setEditDrawerOpen] = useState(false)
  const [itemId, setItemId] = useState(null)

  const handleDelete = id => {
    handleDeleteApi(id)
  }

  const handleEdit = id => {
    setEditDrawerOpen(true)
    setItemId(id)
  }

  const finalData = data ? data : rows
  const pageCount = Math.ceil(finalData.length / rowsPerPage)

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

  const toggleEditDrawer = open => () => {
    setEditDrawerOpen(open)
  }

  const columns = [
    {
      flex: 0.1,
      field: 'id',
      maxWidth: 80,
      headerName: 'ID'
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'name',
      headerName: 'Nomi'
    },

    {
      flex: 0.2,
      minWidth: 200,
      field: 'parent',
      headerName: `Guruh`,
      valueGetter: params => params?.row?.category?.name || 'N/A'
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'brand',
      headerName: `Brend`,
      valueGetter: params => params?.row?.brand?.name || 'N/A'
    },
    {
      flex: 0.1,
      maxWidth: 120,
      field: 'status',
      headerName: `Status`,
      renderCell: params =>
        params?.row?.is_active ? <Chip label='Active' color='success' /> : <Chip label='Inactive' color='error' />
    },

    // Edit button column
    {
      flex: 0.1,
      field: 'edit',
      maxWidth: 100,
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
      renderCell: params => (
        <Button color='error' onClick={() => handleDelete(params?.row?.id)}>
          <Icon icon='tabler:trash' />
        </Button>
      )
    }
  ]

  const DrawerEdit = (
    <DrawerEditProduct toggleDrawer={toggleEditDrawer} data={dataWithoutQuery?.results} itemId={itemId} />
  )

  return (
    <Card>
      <Drawer anchor='right' open={editDrawerOpen} onClose={toggleEditDrawer(false)}>
        {DrawerEdit}
      </Drawer>
      <CardContent>
        <Grid container spacing={6}>
          <ProductFilters
            onCategoryChange={onCategoryChange}
            onActiveChange={onActiveChange}
            onBrandChange={onBrandChange}
            dataWithoutQuery={dataWithoutQuery}
          />
          <Grid item xs={12} marginBottom={6}>
            <Grid container spacing={6}>
              <Grid item xs={12} md={8}>
                <CustomTextField
                  placeholder='Search'
                  value={search}
                  name='search'
                  onChange={({ target }) => onSearchChange(target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Grid container spacing={6} justifyContent={'end'}>
                  <Grid item>
                    <CustomTextField
                      select
                      defaultValue='10'
                      id='custom-select'
                      SelectProps={{ displayEmpty: true }}
                      onChange={({ target }) => setRowsPerPage(target.value)}
                    >
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={20}>15</MenuItem>
                      <MenuItem value={30}>20</MenuItem>
                    </CustomTextField>
                  </Grid>
                  <Grid item>
                    <Link href='./add-product'>
                      <Button variant='contained' color='primary'>
                        {`+ Mahsulot Qo'shish`}
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ height: 650 }}>
              <DataGrid
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

export default ProductsTable
