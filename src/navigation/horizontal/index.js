const navigation = () => [
  {
    title: 'Mahsulot',
    icon: 'tabler:apps',
    children: [
      {
        title: 'Guruhlar',
        path: '/products/groups'
      },
      {
        title: 'Brendlar',
        path: '/products/brands'
      },
      {
        title: "O'lchovlar",
        path: '/products/measurements'
      },
      {
        title: 'Mahsulotlar',
        path: '/products/products'
      }
    ]
  },
  {
    title: 'Omborxona',
    icon: 'tabler:apps',
    children: [
      {
        title: 'Omborlar',
        path: '/inventory/warehouses'
      },
      {
        title: 'Yetkazib beruvchi',
        path: '/inventory/distributors'
      },
      {
        title: 'Mahsulot kirimlari',
        path: '/inventory/entries'
      }
    ]
  }
]

export default navigation
