import React, { useState } from 'react'

import { Card, Drawer, Box, Typography, Grid, MenuItem, Divider, CardContent, Button, Pagination } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'

import CustomTextField from 'src/@core/components/mui/text-field'
import CustomFilter from 'src/components/CustomTable/CustomFilter'
import {
  DrawerItems,
  DrawerEditBrand,
  DrawerEditCategory,
  DrawerEditMeasurement,
  DrawerAddWarehouses,
  DrawerEditWarehouse,
  DrawerAddSupplier,
  DrawerEditSupplier
} from './Drawers'

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

  const DrawerList =
    page === 'Ombor' ? (
      <DrawerAddWarehouses toggleDrawer={toggleDrawer} />
    ) : page === 'Yetkazuvchi' ? (
      <DrawerAddSupplier toggleDrawer={toggleDrawer} />
    ) : (
      <DrawerItems
        toggleDrawer={toggleDrawer}
        page={page}
        handleAdd={handleCreateApi}
        parents={dataWithoutQuery?.results}
      />
    )

  const DrawerEditItem =
    page === 'Brend' ? (
      <DrawerEditBrand
        toggleDrawer={toggleEditDrawer}
        page={page}
        itemId={itemId}
        parents={dataWithoutQuery?.results}
      />
    ) : page === 'Guruh' ? (
      <DrawerEditCategory
        toggleDrawer={toggleEditDrawer}
        page={page}
        itemId={itemId}
        parents={dataWithoutQuery?.results}
      />
    ) : page === "O'lchov" ? (
      <DrawerEditMeasurement toggleDrawer={toggleEditDrawer} page={page} itemId={itemId} />
    ) : page === 'Ombor' ? (
      <DrawerEditWarehouse toggleDrawer={toggleEditDrawer} page={page} itemId={itemId} />
    ) : (
      page === 'Yetkazuvchi' && <DrawerEditSupplier toggleDrawer={toggleEditDrawer} itemId={itemId} />
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
      headerName: page === 'Ombor' ? 'Masul shaxs' : `Ota ${page}`,
      valueGetter: params => {
        if (page === 'Ombor') {
          const responsible = params?.row?.responsible
          const fullName = `${responsible?.first_name || 'N/A'} ${responsible?.last_name || 'N/A'}`
          const phoneNumber = responsible?.phone_number || 'N/A'

          return `${fullName}\n${phoneNumber}`
        } else {
          return params?.row?.parent?.name || 'N/A'
        }
      },
      renderCell: params => {
        if (page === 'Ombor') {
          const responsible = params?.row?.responsible
          const fullName = `${responsible?.first_name || 'N/A'} ${responsible?.last_name || 'N/A'}`
          const phoneNumber = responsible?.phone_number || 'N/A'

          return (
            <Typography variant='body2' noWrap>
              {fullName}
              <br />
              {phoneNumber}
            </Typography>
          )
        }
      }
    },

    {
      flex: 0.35,
      minWidth: 230,
      field: 'phone',
      headerName: 'Telefon Raqami',
      valueGetter: params => params?.row?.phone_number || 'N/A'
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
      <div>
        <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
        <Drawer anchor='right' open={editDrawerOpen} onClose={toggleEditDrawer(false)}>
          {DrawerEditItem}
        </Drawer>
      </div>
      <CardContent>
        <Grid container spacing={6}>
          {page !== "O'lchov" && (
            <CustomFilter dataWithoutQuery={dataWithoutQuery} page={page} onParentChange={onParentChange} />
          )}
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
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ height: 650 }}>
              <DataGrid
                initialState={{
                  columns: {
                    columnVisibilityModel: {
                      parent: page !== "O'lchov" && page !== 'Yetkazuvchi',
                      phone: page === 'Yetkazuvchi'
                    }
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

export default CustomTable
