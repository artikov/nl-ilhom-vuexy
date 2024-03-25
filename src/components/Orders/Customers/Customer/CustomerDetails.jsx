import { Divider, Grid, Typography } from '@mui/material'

import { useGetRegionsQuery } from 'src/store/slices/regionsApiSlice'

const CustomerDetails = ({ client }) => {
  const { data: regions } = useGetRegionsQuery()

  return (
    <>
      <Typography variant='h2' pb={4}>
        Ma'lumotlar
      </Typography>
      <Divider />
      <Grid container pt={4}>
        <Grid item sm={12} md={6}>
          <Typography style={{ marginBottom: 8 }}>
            <b>Kategoriyasi: </b> {client?.category?.name}
          </Typography>
          <Typography style={{ marginBottom: 8 }}>
            <b>F. I. Sh: </b> {client?.full_name}
          </Typography>
          <Typography style={{ marginBottom: 8 }}>
            <b>Telefon Raqami: </b> {client?.phone_number}
          </Typography>
          <Typography style={{ marginBottom: 8 }}>
            <b>Kompaniyasi: </b> {client?.company}
          </Typography>
          <Typography style={{ marginBottom: 8 }}>
            <b>Viloyati: </b> {regions?.results?.find(region => region.id === client?.city.region)?.name}
          </Typography>
          <Typography style={{ marginBottom: 8 }}>
            <b>Shahari: </b> {client?.city.name}
          </Typography>
          <Typography style={{ marginBottom: 8 }}>
            <b>Manzil: </b> {client?.address}
          </Typography>
          <Typography style={{ marginBottom: 8 }}>
            <b>Izoh: </b> {client?.note}
          </Typography>
        </Grid>
        <Grid item sm={12} md={6}>
          {client?.phone_number}
        </Grid>
      </Grid>
    </>
  )
}

export default CustomerDetails
