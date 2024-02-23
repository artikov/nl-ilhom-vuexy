const navigation = () => {
  return [
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

    // {
    //   title: 'Home',
    //   path: '/home',
    //   icon: 'tabler:smart-home'
    // },
    // {
    //   title: 'Second Page',
    //   path: '/second-page',
    //   icon: 'tabler:mail'
    // },
    // {
    //   path: '/acl',
    //   action: 'read',
    //   subject: 'acl-page',
    //   title: 'Access Control',
    //   icon: 'tabler:shield'
    // }
  ]
}

export default navigation
