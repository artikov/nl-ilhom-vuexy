import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { Grid, Button, CardContent, Card, Drawer } from '@mui/material'

import Icon from 'src/@core/components/icon'

import AddCustomerDrawer from 'src/components/Orders/Customers/AddCustomerDrawer'

import { CustomerDetails, CustomerOrders, CustomerPayments } from 'src/components/Orders/Customers/Customer'

const buttonStyle = {
  paddingX: '1rem',
  '&:disabled': {
    backgroundColor: '#7367F0',
    color: 'white',
    pointerEvents: 'none'
  }
}

import { useGetClientQuery } from 'src/store/slices/clientsApiSlice'

const Customer = () => {
  const router = useRouter()
  const { id } = router.query

  const [page, setPage] = useState(1)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const { data: client } = useGetClientQuery(id)

  const toggleDrawer = open => () => {
    setDrawerOpen(open)
  }

  const AddCustomer = <AddCustomerDrawer toggleDrawer={toggleDrawer} customerId={id} />

  return (
    <>
      <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer(false)}>
        {AddCustomer}
      </Drawer>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Link href='/order/customers'>
            <Button variant='outlined' color='primary'>
              <Icon icon='tabler:arrow-left' style={{ marginRight: '0.5rem' }} />
              Orqaga
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} md={6} container spacing={4}>
          <Grid item>
            <Button
              variant={page == 1 ? 'contained' : 'text'}
              color='primary'
              disabled={page == 1}
              sx={buttonStyle}
              onClick={() => setPage(1)}
            >
              Ma'lumotlar
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={page == 2 ? 'contained' : 'text'}
              color='primary'
              disabled={page == 2}
              sx={buttonStyle}
              onClick={() => setPage(2)}
            >
              Buyurtmalar
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={page == 3 ? 'contained' : 'text'}
              color='primary'
              disabled={page == 3}
              sx={buttonStyle}
              onClick={() => setPage(3)}
            >
              To'lovlar
            </Button>
          </Grid>
        </Grid>
        {page == 1 && (
          <Grid item xs={12} md={6} textAlign={'right'}>
            <Button variant='contained' color='primary' onClick={toggleDrawer(true)}>
              <Icon icon='tabler:edit' style={{ marginRight: '0.5rem' }} />
              O'zgartirish
            </Button>
          </Grid>
        )}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              {page === 1 && <CustomerDetails client={client} />}
              {page === 2 && <CustomerOrders />}
              {page === 3 && <CustomerPayments />}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Customer
