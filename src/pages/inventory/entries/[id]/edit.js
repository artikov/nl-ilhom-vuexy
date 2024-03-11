import { Grid, Typography } from '@mui/material'
import EntryEditForm from 'src/components/EntryDetailsPage/EntryEditForm'

import { useRouter } from 'next/router'

const EditEntryPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>Kirimni O'zgartirish</Typography>
      </Grid>

      <Grid item xs={12}>
        <EntryEditForm entryId={id} />
      </Grid>
    </Grid>
  )
}

export default EditEntryPage
