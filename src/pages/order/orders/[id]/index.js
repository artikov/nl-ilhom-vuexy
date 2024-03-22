import React from 'react'
import { useRouter } from 'next/router'

const Order = () => {
  const router = useRouter()
  const id = router.query.id

  return <div>index {id}</div>
}

export default Order
