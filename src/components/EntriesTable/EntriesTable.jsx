/* eslint-disable lines-around-comment */
import { useState } from 'react'
import Link from 'next/link'

import { Card, Drawer, Box, Grid, MenuItem, CardContent, Button, Pagination, Chip } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'

import CustomTextField from 'src/@core/components/mui/text-field'
import EntriesFilters from './EntriesFilters'
import DrawerEditEntry from './DrawerEditEntry'

import { rows } from 'src/@fake-db/table/static-data'

const EntriesTable = ({
  data,
  handleDeleteApi,
  onCategoryChange,
  onSupplierChange,
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

  console.log(finalData)

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
      field: 'date',
      headerName: 'Sana',
      valueGetter: params => {
        const rawDate = params?.row?.created_at
        if (rawDate) {
          const formattedDate = new Intl.DateTimeFormat('uz', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          }).format(new Date(rawDate))

          return formattedDate
        }

        return 'N/A'
      }
    },

    {
      flex: 0.2,
      minWidth: 200,
      field: 'quantity',
      headerName: `Miqdor`,
      valueGetter: params => params?.row?.category?.name || 'N/A'
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'warehouse',
      headerName: `Omborxona`,
      valueGetter: params => params?.row?.warehouse?.name || 'N/A'
    },
    {
      flex: 0.1,
      width: 150,
      field: 'status',
      headerName: `Status`,
      renderCell: params =>
        params?.row?.status === 'done' ? (
          <Chip label='Complete' color='success' />
        ) : (
          <Chip label='Pending' color='warning' />
        )
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

  // const DrawerEdit = (
  //   // <DrawerEditProduct toggleDrawer={toggleEditDrawer} data={dataWithoutQuery?.results} itemId={itemId} />
  // )

  return (
    <Card>
      {/* <Drawer anchor='right' open={editDrawerOpen} onClose={toggleEditDrawer(false)}>
        {DrawerEdit}
      </Drawer> */}
      <CardContent>
        <Grid container spacing={6}>
          <EntriesFilters
            onCategoryChange={onCategoryChange}
            onActiveChange={onActiveChange}
            onSupplierChange={onSupplierChange}
            dataWithoutQuery={dataWithoutQuery}
          />
          <Grid item xs={12} marginBottom={6}>
            <Grid container spacing={6}>
              <Grid item xs={12} md={7}>
                <CustomTextField
                  placeholder='Search'
                  fullWidth
                  value={search}
                  name='search'
                  onChange={({ target }) => onSearchChange(target.value)}
                />
              </Grid>
              <Grid item xs={12} md={5}>
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
                      <MenuItem value={20}>15</MenuItem>
                      <MenuItem value={30}>20</MenuItem>
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={12} md={'auto'}>
                    <Link href='./accept-product'>
                      <Button variant='contained' color='primary' fullWidth>
                        {`+ Mahsulot Kirim Qilish`}
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

export default EntriesTable
