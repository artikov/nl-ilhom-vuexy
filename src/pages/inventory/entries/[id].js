import { useRouter } from 'next/router'

import { CircularProgress, Grid, Typography, Card, CardContent, Divider } from '@mui/material'

import { useGetEntryQuery } from 'src/store/slices/warehouseIncomesApiSlice'

const EntryDetailPage = () => {
  const router = useRouter()
  const { id } = router.query

  const { data: entry, error, isLoading } = useGetEntryQuery(id)
  console.log(entry)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h1'>Kirim Ma'lumotlari</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <CardContent>
              <Grid container spacing={6}>
                <Grid item container>
                  <Grid item xs={12} md={6}>
                    <Typography variant='h3'>Yetkazib Beruvchi:</Typography>
                    <Typography variant='h3' color='secondary'>
                      {entry?.supplier?.name}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item xs={12} md={6}>
                    <Typography variant='h3'>Omborxona:</Typography>
                    <Typography variant='h3' color='secondary'>
                      {entry?.warehouse?.name}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Divider />
                </Grid>
                <Grid item container borderBottom={'dotted 1px gray'}>
                  <Typography variant='h5'>{entry?.status}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          )}
        </Card>
      </Grid>
    </Grid>
  )
}

export default EntryDetailPage
