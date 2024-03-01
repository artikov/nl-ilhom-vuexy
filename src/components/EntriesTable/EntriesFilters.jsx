import { useState } from 'react'

import { Grid, MenuItem, Typography, Divider, Button } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'

import { useGetWarehousesQuery } from 'src/store/slices/warehousesApiSlice'
import { useGetSuppliersQuery } from 'src/store/slices/suppliersApiSlice'

const EntriesFilters = ({ onStatusChange, onWarehouseChange, onSupplierChange }) => {
  const [status, setStatus] = useState('')
  const [selectedWarehouse, setSelectedWarehouse] = useState('')
  const [selectedSupplier, setSelectedSupplier] = useState('')

  const { data: warehouses } = useGetWarehousesQuery()
  const { data: suppliers } = useGetSuppliersQuery({ person_type: '' })

  // const handleStatusChange = event => {
  //   setStatus(event.target.value)
  //   onStatusChange(event.target.value)
  // }

  const handleSupplierChange = event => {
    setSelectedSupplier(event.target.value)
    onSupplierChange(event.target.value)
  }

  return (
    <Grid item xs={12}>
      <Typography variant='h3'>Filter</Typography>
      <Grid container>
        <Grid item xs={12}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={5}>
              <CustomTextField select fullWidth defaultValue={''}>
                <MenuItem disabled value={''}>
                  <em>17/12/2022</em>
                </MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} md={5}>
              <CustomTextField select fullWidth defaultValue={''}>
                <MenuItem disabled value={''}>
                  <em>17/12/2022</em>
                </MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button variant='contained' color='primary' fullWidth>
                Reset
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomTextField
                select
                defaultValue=''
                id='custom-select'
                fullWidth
                SelectProps={{ displayEmpty: true }}
                value={selectedSupplier}
                onChange={handleSupplierChange}
              >
                <MenuItem disabled value=''>
                  <em>Yetkazib Beruvchini Tanlang</em>
                </MenuItem>
                {suppliers?.results?.map(supplier => (
                  <MenuItem key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <CustomTextField select fullWidth defaultValue={''}>
                <MenuItem disabled value={''}>
                  <em>17/12/2022</em>
                </MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <CustomTextField select fullWidth defaultValue={''}>
                <MenuItem disabled value={''}>
                  <em>17/12/2022</em>
                </MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button variant='contained' color='primary' fullWidth>
                Reset
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default EntriesFilters
