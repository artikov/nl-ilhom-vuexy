import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import {
  CircularProgress,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from '@mui/material'
import Icon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'

import EntryDetailsDialog from 'src/components/EntryDetailsPage/EntryDetailsDialog'

import { useGetEntryQuery } from 'src/store/slices/warehouseIncomesApiSlice'
import { useGetWarehouseQuery } from 'src/store/slices/warehousesApiSlice'

const EntryDetailPage = () => {
  const [open, setOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})

  const router = useRouter()
  const { id } = router.query

  const { data: entry, isLoading } = useGetEntryQuery(id)
  console.log(entry)
  const warehouseId = entry?.warehouse?.id
  const { data: warehouse } = useGetWarehouseQuery(warehouseId)
  console.log(warehouse)

  const handleDialog = (e, itemId) => {
    setOpen(true)
    setSelectedItem(entry?.warehouse_items?.find(item => item.id === itemId))
  }

  console.log(selectedItem)

  const createdDate = new Date(entry?.created_at).toLocaleDateString('uz-UZ')

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Link href='/inventory/entries'>
          <Button variant='outlined' color='primary'>
            <Icon icon='tabler:arrow-left' style={{ marginRight: '0.5rem' }} />
            Orqaga
          </Button>
        </Link>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant='h1'>Kirim Ma'lumotlari</Typography>
      </Grid>
      <Grid item xs={12} md={6} textAlign={'right'}>
        <Button variant='contained' color='primary'>
          <Icon icon='tabler:edit' style={{ marginRight: '0.5rem' }} />
          O'zgartirish
        </Button>
      </Grid>
      <Grid item xs={12}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Grid container spacing={6}>
                    <Grid item container spacing={6} xs={12} md={6}>
                      <Grid item xs={12} md={6} container>
                        <Grid item xs={12}>
                          <Typography variant='h4' style={{ marginBottom: 12 }}>
                            Omborxona:
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography style={{ marginBottom: 8 }}>
                            <b>Nomi: </b> {entry?.warehouse?.name}
                          </Typography>
                          <Typography style={{ marginBottom: 8 }}>
                            <b>Manzil: </b>
                            {entry?.warehouse?.address}
                          </Typography>
                          <Typography style={{ marginBottom: 8 }}>
                            <b>Ma'sul Shaxs: </b>
                            {`${warehouse?.responsible?.first_name} ${warehouse?.responsible?.last_name}`}
                          </Typography>
                          <Typography>
                            <b>Telefon Raqami: </b>
                            {warehouse?.responsible?.phone_number}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item container spacing={6} xs={12} md={6}>
                      <Grid item xs={12} style={{ marginBottom: 12 }}>
                        <Typography variant='h4'>Yetkazib Beruvchi:</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography style={{ marginBottom: 8 }}>
                          <b>Nomi: </b>
                          {entry?.supplier?.name}
                        </Typography>
                        <Typography style={{ marginBottom: 8 }}>
                          <b>Telefon Raqami: </b>
                          {entry?.supplier?.phone_number}
                        </Typography>
                        <Typography style={{ marginBottom: 8 }}>
                          <b>Shaxs Turi: </b>
                          {`${entry?.supplier?.person_type == 'natural_person' ? 'Jismoniy shaxs' : 'Yuridik Shaxs'}`}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Divider />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography variant='h4' style={{ marginBottom: 12 }}>
                        Mahsulot Kirim Qilgan Shaxs:
                      </Typography>
                      <Typography style={{ marginBottom: 8 }}>
                        <b>Nomi: </b>
                        {`${entry?.created_by?.first_name || 'root'} ${entry?.created_by?.last_name || 'admin'}`}
                      </Typography>
                      <Typography style={{ marginBottom: 8 }}>
                        <b>Telefon Raqami: </b>
                        {`${entry?.created_by?.phone_number || 'root phone num'}`}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant='h4' style={{ marginBottom: 12 }}>
                        Mahsulot Kirimni O'zgartirgan Shaxs:
                      </Typography>
                      <Typography style={{ marginBottom: 8 }}>
                        <b>Nomi: </b>
                        {`${entry?.updated_by?.first_name || 'root'} ${entry?.updated_by?.last_name || 'admin'}`}
                      </Typography>
                      <Typography style={{ marginBottom: 8 }}>
                        <b>Telefon Raqami: </b>
                        {`${entry?.updated_by?.phone_number || 'root phone num'}`}
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography style={{ marginBottom: '8px' }} component='div'>
                        <b>Statusi: </b>
                        <span style={{ marginLeft: '8px' }}>
                          {entry?.status === 'in_progress' ? (
                            <CustomChip label='Jarayonda' color='warning' skin='light' />
                          ) : (
                            <CustomChip label='Qabul Qilingan' color='success' skin='light' />
                          )}
                        </span>
                      </Typography>

                      <Typography style={{ marginBottom: '8px' }}>
                        <b>Valyuta kursi:</b>
                        <span style={{ marginLeft: '8px' }}>{`${entry?.currency_ratio?.ratio} so'm`}</span>
                      </Typography>

                      <Typography style={{ marginBottom: '8px' }}>
                        <b>Jami Miqdor:</b>
                        <span style={{ marginLeft: '8px' }}>{entry?.quantity}</span>
                      </Typography>

                      <Typography style={{ marginBottom: '8px' }}>
                        <b>Jami Summa So'mda:</b>
                        <span style={{ marginLeft: '8px' }}>{entry?.total_price_som.toLocaleString()}</span>
                      </Typography>

                      <Typography style={{ marginBottom: '8px' }}>
                        <b>Jami Summa Valyutada:</b>
                        <span style={{ marginLeft: '8px' }}>{entry?.total_price.toLocaleString()}</span>
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <EntryDetailsDialog dialogOpen={open} onDialogClose={setOpen} item={selectedItem} />
                  <Grid container spacing={6}>
                    {entry?.warehouse_items?.length > 0 && (
                      <Grid item container xs={12}>
                        <Grid item xs={12}>
                          <Typography variant='h4'>Mahsulotlar</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <TableContainer>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell>№</TableCell>
                                  <TableCell>Mahsulot</TableCell>
                                  <TableCell>Miqdori</TableCell>
                                  <TableCell>Mahsulot Narxi</TableCell>
                                  <TableCell>Kirim Narxi</TableCell>
                                  <TableCell>So'mdagi Narxi</TableCell>
                                  <TableCell></TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {entry?.warehouse_items?.map((product, index) => (
                                  <TableRow key={product.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{product.product.name}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>{product.price.toLocaleString()}</TableCell>
                                    <TableCell>{product.total_price.toLocaleString()}</TableCell>
                                    <TableCell>{product.total_price_som.toLocaleString()}</TableCell>
                                    <TableCell>
                                      <Button variant='contained' onClick={e => handleDialog(e, product.id)}>
                                        <Icon icon='tabler:qrcode' />
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

export default EntryDetailPage
