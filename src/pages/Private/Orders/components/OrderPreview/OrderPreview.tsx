import { currencyPrice, currencyPriceDolar } from "@/helpers/currencyPrice"
import useDateTimeFormat from "@/helpers/dateHelpers"
import { AppStore } from "@/redux/models/store"
import {
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import React from "react"
import { useSelector } from "react-redux"
import useCartOrder from "../../hooks/useCartOrder"

export interface OrderPreviewInterface {}

const OrderPreview: React.FC<OrderPreviewInterface> = () => {
  const { currentOrder, settings } = useSelector(
    (store: AppStore) => store.orders
  )

  const { calculatePrices } = useCartOrder()
  const {
    facturation_initial,
    num_last_facture,
    num_control,
    percent_iva,
    price_dollar,
  } = settings
  const {
    tableSelectId,
    tableSelectName,
    personalSelectDocument,
    personalSelectName,
    products,
  } = currentOrder

  const { subTotalPrice, totalPrice, totalPriceDolar } = calculatePrices(
    products,
    percent_iva,
    price_dollar
  )
  return (
    <Container>
      <Typography
        color="primary"
        align="center"
        variant="h5"
        sx={{ my: 1, fontWeight: 700 }}
      >
        Previsualización del Pedido
      </Typography>
      <Paper elevation={0}>
        <Stack
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          gap={1}
        >
          <Typography
            color="gray"
            component="span"
          >
            <strong>Mesa: </strong>
            {`${tableSelectId} - ${tableSelectName}`}
          </Typography>

          <Typography
            color="gray"
            component="span"
          >
            <strong>Mesonero: </strong>
            {`${personalSelectDocument} - ${personalSelectName}`}
          </Typography>
          <Typography
            color="gray"
            component="span"
          >
            <strong>Fecha: </strong>
            {useDateTimeFormat(Date.now())}
          </Typography>
          <Typography
            color="gray"
            component="span"
          >
            <strong>Factura N°: </strong>
            {`${facturation_initial + num_last_facture + 1}`}
          </Typography>
          <Typography
            color="gray"
            component="span"
          >
            <strong>Control N°: </strong>
            {`${num_control}${(facturation_initial + num_last_facture + 1)
              .toString()
              .padStart(8, "0")}`}
          </Typography>
        </Stack>
      </Paper>
      <TableContainer
        style={{
          color: "var(--primary-color)",
          border: "1px solid var(--primary-color)",
          margin: "10px 0",
          padding: "5px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <th scope="col">Cant.</th>
              <th scope="col">Descripción</th>
              <th scope="col">Precio Unit.</th>
              <th scope="col">Valor Bs + IVA</th>
              <th scope="col">Valor Total Bs</th>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(
              ({
                product_id,
                product_name,
                product_count,
                product_base_price,
              }) => {
                let priceIvaInclude =
                  ((product_base_price * percent_iva) / 100 +
                    product_base_price) *
                  product_count

                return (
                  <TableRow
                    key={product_id}
                    style={{
                      color: "gray",
                      textAlign: "right",
                    }}
                  >
                    <td
                      scope="row"
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {product_count}
                    </td>
                    <td
                      style={{
                        textAlign: "left",
                      }}
                    >
                      {product_name}
                    </td>
                    <td>Bs {currencyPrice.format(product_base_price)}</td>
                    <td>
                      Bs{" "}
                      {currencyPrice.format(
                        (product_base_price * percent_iva) / 100 +
                          product_base_price
                      )}
                    </td>
                    <td>
                      Bs {currencyPrice.format(priceIvaInclude)}
                      {/* {parseFloat(price_iva * i.product_count).toFixed(2)} */}
                    </td>
                  </TableRow>
                )
              }
            )}
          </TableBody>
          <TableFooter
            style={{
              fontSize: "14px",
            }}
          >
            <tr>
              <th
                scope="col"
                colSpan={2}
              ></th>
              <th
                scope="col"
                colSpan={2}
                style={{
                  textAlign: "right",
                }}
              >
                Monto Excento y/o Exonerado
              </th>
              <th
                scope="col"
                style={{
                  color: "var(--text-color)",
                  textAlign: "right",
                }}
              >
                {" "}
                0bs
              </th>
            </tr>
            <tr>
              <th
                scope="col"
                colSpan={2}
              ></th>
              <th
                scope="col"
                colSpan={2}
                style={{
                  textAlign: "right",
                }}
              >
                Sub-Total
              </th>
              <th
                scope="col"
                style={{
                  color: "var(--text-color)",
                  textAlign: "right",
                }}
              >
                Bs {currencyPrice.format(subTotalPrice)}
              </th>
            </tr>
            <tr>
              <th
                scope="col"
                colSpan={2}
              ></th>
              <th
                scope="col"
                colSpan={2}
                style={{
                  textAlign: "right",
                }}
              >
                <strong>
                  Total + I.V.A. <small>{percent_iva}</small>%
                </strong>
              </th>
              <th
                scope="col"
                style={{
                  color: "var(--text-color)",
                  textAlign: "right",
                }}
              >
                Bs {currencyPrice.format(totalPrice)}
              </th>
            </tr>
            <tr>
              <th
                scope="col"
                colSpan={2}
              ></th>
              <th
                scope="col"
                colSpan={2}
                style={{
                  textAlign: "right",
                }}
              >
                Total en Dólares
              </th>
              <th
                scope="col"
                style={{
                  color: "var(--text-color)",
                  textAlign: "right",
                }}
              >
                {currencyPriceDolar.format(totalPriceDolar)}
              </th>
            </tr>
          </TableFooter>
        </Table>
      </TableContainer>
      <Stack
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        gap={1}
        style={{
          margin: "20px 0",
        }}
      >
        <Button
          color="error"
          variant="contained"
        >
          Cancelar
        </Button>
        <Button
          color="warning"
          variant="contained"
        >
          Continuar
        </Button>

        <Button
          color="info"
          variant="contained"
        >
          Ordenar
        </Button>
        <Button
          color="success"
          variant="contained"
        >
          Facturar
        </Button>
      </Stack>
    </Container>
  )
}

export default OrderPreview
