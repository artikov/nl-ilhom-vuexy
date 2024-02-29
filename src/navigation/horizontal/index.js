const navigation = () => [
  {
    title: 'Mahsulot',
    icon: 'tabler:apps',
    children: [
      {
        title: 'Kategoriyalar',
        path: '/products/categories'
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
        path: '/products'
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
        path: '/inventory/suppliers'
      },
      {
        title: 'Mahsulot kirimlari',
        path: '/inventory/entries'
      }
    ]
  }
]

export default navigation
