import React, { useState } from 'react'

import { Card, Drawer, Box, Typography, Grid, MenuItem, Divider, CardContent, Button, Pagination } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'

import CustomTextField from 'src/@core/components/mui/text-field'
import DrawerItems from './DrawerItems'
import DrawerEdit from './DrawerEdit'

import { rows } from 'src/@fake-db/table/static-data'

const CustomTable = ({
  data,
  page,
  handleCreateApi,
  handleDeleteApi,
  onParentChange,
  onSearchChange,
  search,
  dataWithoutQuery
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedParent, setSelectedParent] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [editDrawerOpen, setEditDrawerOpen] = useState(false)
  const [brandId, setBrandId] = useState(null)

  const handleDelete = id => {
    handleDeleteApi(id)
  }

  const handleEdit = id => {
    setEditDrawerOpen(true)
    setBrandId(id)
  }

  const handleParentChange = newParent => {
    onParentChange(newParent)
    setSelectedParent(newParent)
  }

  const handleSearchChange = newSearch => {
    onSearchChange(newSearch)
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

  const toggleDrawer = open => () => {
    setDrawerOpen(open)
  }

  const toggleEditDrawer = open => () => {
    setEditDrawerOpen(open)
  }

  const DrawerList = (
    <DrawerItems
      toggleDrawer={toggleDrawer}
      page={page}
      handleAdd={handleCreateApi}
      parents={dataWithoutQuery?.results}
    />
  )

  const DrawerEditItem = (
    <DrawerEdit toggleDrawer={toggleEditDrawer} page={page} brandId={brandId} parents={dataWithoutQuery?.results} />
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
      headerName: 'Nomi'
    },
    {
      flex: 0.35,
      minWidth: 230,
      field: 'parent',
      headerName: `Ota ${page}`,
      valueGetter: params => params?.row?.parent?.name || 'N/A'
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
        <Button color='error' onClick={() => handleDelete(params.row.id)}>
          <Icon icon='tabler:trash' />
        </Button>
      )
    }
  ]

  return (
    <Card>
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography variant='h3'>Filter</Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={4}>
                  <Grid item xs={10}>
                    <CustomTextField
                      select
                      value={selectedParent}
                      name='parent'
                      id='custom-select'
                      fullWidth
                      onChange={({ target }) => handleParentChange(target.value)}
                      SelectProps={{ displayEmpty: true }}
                    >
                      <MenuItem disabled value={''}>
                        <em>{`Parent ${page} Tanlang`}</em>
                      </MenuItem>
                      {dataWithoutQuery?.results?.map((parent, index) => (
                        <MenuItem key={index} value={parent.id}>
                          {parent.name}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => handleParentChange('')}
                      disabled={selectedParent === ''}
                    >
                      Reset
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} marginBottom={6}>
            <Grid container spacing={6}>
              <Grid item xs={12} md={8}>
                <CustomTextField
                  placeholder='Search'
                  value={search}
                  name='search'
                  onChange={({ target }) => handleSearchChange(target.value)}
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
                    <Button variant='contained' color='primary' onClick={toggleDrawer(true)}>
                      {`+ ${page} Qo'shish`}
                    </Button>
                    <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer(false)}>
                      {DrawerList}
                    </Drawer>
                    <Drawer anchor='right' open={editDrawerOpen} onClose={toggleEditDrawer(false)}>
                      {DrawerEditItem}
                    </Drawer>
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

export default CustomTable
