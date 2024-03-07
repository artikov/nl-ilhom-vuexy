const navigation = () => [
  {
    title: 'Home',
    path: '/home',
    icon: 'tabler:smart-home'
  },
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
  },
  {
    title: 'Valyuta',
    icon: 'tabler:adjustments-dollar',
    path: '/currency'
  }
]

export default navigation
