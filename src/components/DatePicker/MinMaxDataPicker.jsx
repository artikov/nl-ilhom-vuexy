import { useTheme } from '@mui/material/styles'

// ** Third Party Imports
import subDays from 'date-fns/subDays'
import addDays from 'date-fns/addDays'
import DatePicker from 'react-datepicker'

// ** Custom Component Imports
import CustomInput from './PickersCustomInput'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { Grid } from '@mui/material'

const PickersMinMax = ({ earliestDate, latestDate, minDate, maxDate, setMinDate, setMaxDate, setFilteredByDate }) => {
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  return (
    <DatePickerWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DatePicker
            id='min-date'
            selected={minDate || new Date()}
            minDate={subDays(earliestDate, 1) || subDays(new Date(), 5)}
            maxDate={addDays(latestDate, 1) || addDays(new Date(), 5)}
            popperPlacement={popperPlacement}
            onChange={date => {
              setMinDate(date)
              setFilteredByDate(true)
            }}
            customInput={<CustomInput fullWidth />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DatePicker
            id='max-date'
            selected={maxDate || new Date()}
            minDate={subDays(earliestDate, 1) || subDays(new Date(), 5)}
            maxDate={addDays(latestDate, 1) || addDays(new Date(), 5)}
            popperPlacement={popperPlacement}
            onChange={date => {
              setMaxDate(date)
              setFilteredByDate(true)
            }}
            customInput={<CustomInput fullWidth />}
          />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default PickersMinMax
