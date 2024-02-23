const navigation = () => [
  {
    title: 'Dashboards',
    icon: 'tabler:smart-home',
    children: [
      {
        title: "Tovar Qo'shish",
        path: '/dashboards/add-product'
      },
      {
        title: 'Tovar Qabul Qilish',
        path: '/dashboards/accept-product'
      }
    ]
  }
]

export default navigation
