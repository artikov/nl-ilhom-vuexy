import { useState } from 'react'

import { Card, CardContent, Drawer, Grid, MenuItem, Box, Button } from '@mui/material'

import CustomTextField from 'src/@core/components/mui/text-field'

const CustomerCategoriesTable = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = () => {
    console.log('toggleDrawer')
  }

  return (
    <Card>
      <div>
        {/* <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
        <Drawer anchor='right' open={editDrawerOpen} onClose={toggleEditDrawer(false)}>
          {DrawerEditItem}
        </Drawer> */}
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
                  <MenuItem value={20}>15</MenuItem>
                  <MenuItem value={30}>20</MenuItem>
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
              {/* <DataGrid
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
              /> */}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CustomerCategoriesTable
