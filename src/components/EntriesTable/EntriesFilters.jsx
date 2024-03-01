import { Grid, MenuItem, Typography, Divider, Button } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'

const EntriesFilters = () => {
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
