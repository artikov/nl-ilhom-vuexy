import { GridPagination } from '@mui/x-data-grid'
import { makeStyles } from '@mui/system '

const useStyles = makeStyles(theme => ({
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2)
  }
}))

const CustomPagination = props => {
  const classes = useStyles()

  return (
    <div className={classes.pagination}>
      <GridPagination {...props} />
    </div>
  )
}
