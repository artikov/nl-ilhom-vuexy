import React, { useState } from 'react'

import {
  Card,
  CardHeader,
  Box,
  Typography,
  Grid,
  MenuItem,
  Divider,
  CardContent,
  Button,
  Pagination
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'

import CustomTextField from 'src/@core/components/mui/text-field'

import { rows } from 'src/@fake-db/table/static-data'

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
    headerName: 'Name'
  },
  {
    flex: 0.35,
    minWidth: 230,
    field: 'parent',
    headerName: 'Parent Group'
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

const CustomTable = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 10 // Adjust as needed

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage)
  }

  const CustomPagination = ({ name, setName }) => (
    <Pagination
      count={Math.ceil(rows.length / rowsPerPage)}
      page={currentPage}
      onChange={handlePageChange}
      variant='outlined'
      shape='rounded'
      color='primary'
    />
  )

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
                <CustomTextField
                  select
                  defaultValue=''
                  id='custom-select'
                  fullWidth
                  SelectProps={{ displayEmpty: true }}
                >
                  <MenuItem disabled value=''>
                    <em>Ota Guruhni Tanlang</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </CustomTextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} marginBottom={6}>
            <Grid container spacing={6}>
              <Grid item xs={12} md={8}>
                <CustomTextField placeholder='Search' />
              </Grid>
              <Grid item xs={12} md={4}>
                <Grid container spacing={6} justifyContent={'end'}>
                  <Grid item>
                    <CustomTextField select defaultValue='' id='custom-select' SelectProps={{ displayEmpty: true }}>
                      <MenuItem disabled value=''>
                        <em>10</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </CustomTextField>
                  </Grid>
                  <Grid item>
                    <Button variant='contained' color='primary'>
                      + Guruh Qo'shish
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ height: 650 }}>
              <DataGrid
                columns={columns}
                rows={rows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)}
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
