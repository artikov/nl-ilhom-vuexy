import { useState } from 'react'

import { Button, Divider, Grid, MenuItem, Typography } from '@mui/material'

import CustomTextField from 'src/@core/components/mui/text-field'

const persons = [
  { id: 1, type: 'natural_person', name: 'Jismoniy Shaxs' },
  { id: 2, type: 'legal_entity', name: 'Yuridik Shaxs' }
]

const CustomFilter = ({ page, dataWithoutQuery, onParentChange }) => {
  const [selectedParent, setSelectedParent] = useState('')

  const handleParentChange = newParent => {
    onParentChange(newParent)
    setSelectedParent(newParent)
  }

  return (
    <>
      <Grid item xs={12} md={6}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant='h3'>Filter</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={10}>
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
                    <em>
                      {page === 'Ombor'
                        ? 'Masul shaxs'
                        : page === 'Yetkazuvchi'
                        ? 'Yetkazuvchi Turini Tanlang'
                        : `Ota ${page} Tanlang`}
                    </em>
                  </MenuItem>
                  {page === 'Ombor'
                    ? dataWithoutQuery?.results
                        ?.filter(
                          (item, index, array) =>
                            array.findIndex(i => i?.responsible?.id === item?.responsible?.id) === index
                        )
                        ?.map((item, index) => (
                          <MenuItem key={index} value={item?.responsible?.id}>
                            {`${item?.responsible?.first_name} ${item?.responsible?.last_name}`}
                          </MenuItem>
                        ))
                    : page === 'Yetkazuvchi'
                    ? persons.map((person, index) => (
                        <MenuItem key={index} value={person.type}>
                          {person.name}
                        </MenuItem>
                      ))
                    : dataWithoutQuery?.results?.map((parent, index) => (
                        <MenuItem key={index} value={parent.id}>
                          {parent.name}
                        </MenuItem>
                      ))}
                </CustomTextField>
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  variant='contained'
                  color='primary'
                  fullWidth
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
    </>
  )
}

export default CustomFilter
