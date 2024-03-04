import { useState } from 'react'
import { Grid, MenuItem, Typography, Divider, Button } from '@mui/material'

import CustomTextField from 'src/@core/components/mui/text-field'

const ProductFilters = ({ onCategoryChange, onBrandChange, onActiveChange, dataWithoutQuery }) => {
  const [selectedParent, setSelectedParent] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [filtered, setFiltered] = useState(false)

  const handleCategroyChange = newCategory => {
    onCategoryChange(newCategory)
    setSelectedParent(newCategory)
    setFiltered(true)
  }

  const handleBrandChange = newBrand => {
    onBrandChange(newBrand)
    setSelectedBrand(newBrand)
    setFiltered(true)
  }

  const handleStatusChange = newStatus => {
    onActiveChange(newStatus)
    setSelectedStatus(newStatus)
    setFiltered(true)
  }

  const handleResetFilters = () => {
    onCategoryChange('')
    onBrandChange('')
    onActiveChange(null)
    setSelectedParent('')
    setSelectedBrand('')
    setSelectedStatus('')
    setFiltered(false)
  }

  return (
    <>
      <Grid item xs={12}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant='h3'>Filter</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <CustomTextField
                  select
                  value={selectedParent}
                  name='parent'
                  id='custom-select'
                  fullWidth
                  onChange={({ target }) => {
                    handleCategroyChange(target.value)
                  }}
                  SelectProps={{ displayEmpty: true }}
                >
                  <MenuItem disabled value={''}>
                    <em>{`Kategoriya Tanlang`}</em>
                  </MenuItem>
                  {dataWithoutQuery?.results
                    ?.filter(
                      (item, index, array) => array.findIndex(i => i?.category?.id === item?.category?.id) === index
                    )
                    .map((item, index) => (
                      <MenuItem key={index} value={item?.category?.id}>
                        {item?.category?.name}
                      </MenuItem>
                    ))}
                </CustomTextField>
              </Grid>
              <Grid item xs={12} md={3}>
                <CustomTextField
                  select
                  value={selectedBrand}
                  name='brand'
                  id='custom-select'
                  fullWidth
                  onChange={({ target }) => handleBrandChange(target.value)}
                  SelectProps={{ displayEmpty: true }}
                >
                  <MenuItem disabled value={''}>
                    <em>{`Brend`}</em>
                  </MenuItem>
                  {dataWithoutQuery?.results
                    ?.filter((item, index, array) => array.findIndex(i => i?.brand?.id === item?.brand?.id) === index)
                    .map((item, index) => (
                      <MenuItem key={index} value={item?.brand?.id}>
                        {item?.brand?.name}
                      </MenuItem>
                    ))}
                </CustomTextField>
              </Grid>
              <Grid item xs={12} md={3}>
                <CustomTextField
                  select
                  value={selectedStatus}
                  name='status'
                  id='custom-select'
                  fullWidth
                  onChange={({ target }) => handleStatusChange(target.value)}
                  SelectProps={{ displayEmpty: true }}
                >
                  <MenuItem disabled value={''}>
                    <em>{`Status`}</em>
                  </MenuItem>
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Inactive</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  variant='contained'
                  color='primary'
                  onClick={() => handleResetFilters()}
                  disabled={!filtered}
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
    </>
  )
}

export default ProductFilters
