import { formatCurrency } from 'src/utils/format'
import { ref } from 'vue'

const columnsProduct = [
  { name: 'img_url', align: 'left', label: 'Img', field: 'img_url', sortable: false },
  { name: 'name', align: 'left', label: 'Nome', field: 'name', sortable: true },
  { name: 'amount', align: 'left', label: 'Qtde', field: 'amount', sortable: true },
  { name: 'price', align: 'left', label: 'Preço', field: 'price', format: (val) => formatCurrency(val), sortable: true },
  { name: 'actions', align: 'right', label: 'Ações', field: 'actions', sortable: true },
]

const initialPagination = ref({
  page: 1,
  rowsPerPage: 3
})

export {
  columnsProduct,
  initialPagination
}
