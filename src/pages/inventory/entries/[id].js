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

import { useGetEntryQuery } from 'src/store/slices/warehouseIncomesApiSlice'
import { useGetWarehouseQuery } from 'src/store/slices/warehousesApiSlice'
import Link from 'next/link'

const EntryDetailPage = () => {
  const router = useRouter()
  const { id } = router.query

  const { data: entry, isLoading } = useGetEntryQuery(id)
  console.log(entry)
  const warehouseId = entry?.warehouse?.id
  const { data: warehouse } = useGetWarehouseQuery(warehouseId)
  console.log(warehouse)

  const createdDate = new Date(entry?.created_at).toLocaleDateString('uz-UZ')

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h1'>Kirim Ma'lumotlari</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <CardContent>
              <Grid container spacing={6}>
                <Grid item container spacing={6} xs={12} md={6}>
                  <Grid item xs={12}>
                    <Typography variant='h4'>Yetkazib Beruvchi:</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant='h5'>{entry?.supplier?.name}</Typography>
                    <Typography>{entry?.supplier?.phone_number}</Typography>
                    <Typography>{`${
                      entry?.supplier?.person_type == 'natural_person' ? 'Jismoniy shaxs' : 'Yuridik Shaxs'
                    }`}</Typography>
                  </Grid>
                </Grid>

                <Grid item container spacing={6} xs={12} md={6}>
                  <Grid item xs={12} md={6} container>
                    <Grid item xs={12}>
                      <Typography variant='h4'>Omborxona:</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='h5'>{entry?.warehouse?.name}</Typography>
                      <Typography>{entry?.warehouse?.address}</Typography>
                    </Grid>
                  </Grid>

                  <Grid item container spacing={6} xs={12} md={6}>
                    <Grid item xs={12} md={6} container>
                      <Grid item xs={12}>
                        <Typography variant='h4'>Ma'sul Shaxs:</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant='h5'>
                          {`${warehouse?.responsible?.first_name} ${warehouse?.responsible?.last_name}`}
                        </Typography>
                        <Typography>{warehouse?.responsible?.phone_number}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item container justifyContent={'space-between'}>
                  <Typography variant='h5'>Kiritlgan sana: {createdDate}</Typography>
                  <Typography variant='h5'>{`${
                    entry?.status == 'in_progress' ? 'Qabul Qilish Jarayonda' : 'Qabul Qilingan'
                  }`}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h5'>Qabul Qilgan shaxs:</Typography>
                  <Typography variant='body1'>{`${
                    entry?.created_by?.first_name == '' ? 'root' : entry?.created_by?.first_name
                  } ${entry?.created_by?.last_name == '' ? 'admin' : entry?.created_by?.last_name}`}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
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
                              <TableCell>Soni</TableCell>
                              <TableCell>Kirim Narxi</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {entry?.warehouse_items?.map((product, index) => (
                              <TableRow key={product.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{product.product.name}</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                                <TableCell>{product.input_price}</TableCell>
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
          )}
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Link href='/inventory/entries'>
          <Button variant='tonal' color='primary'>
            Barcha Kirimlarga Qaytish
          </Button>
        </Link>
      </Grid>
    </Grid>
  )
}

export default EntryDetailPage
