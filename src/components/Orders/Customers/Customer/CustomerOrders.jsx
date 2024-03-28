import React from 'react'
import { Divider, Typography } from '@mui/material'

import CustomerOrdersTable from './CustomerOrdersTable'

const CustomerOrders = () => {
  return (
    <>
      <Typography variant='h2' mb={6}>
        Buyurtmalar
      </Typography>
      <Divider />
      <CustomerOrdersTable />
    </>
  )
}

export default CustomerOrders
