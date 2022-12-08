<template>
  <q-page padding>

    <div class="row" v-if="brand.name">
      <div class="col-12 text-center text-h4">
        {{ brand.name }}
      </div>
    </div>

      <div class="row">

      <!--
        map-options:
       -->
      <q-select
        outlined
        v-model="categoryId"
        :options="optionsCategories"
        label="Categoria"
        option-label="name"
        option-id="id"
        clearable
        class="col-xs-12 col-sm-4"
        @update:model-value="handleListProducts(route.params.id)"
      />

      <q-table
        :rows="products"
        :columns="columnsProduct"
        v-model:pagination="initialPagination"
        row-key="id"
        class="col-12"
        :loading="loading"
        :filter="filter"
        grid
        hide-pagination
      >

        <template v-slot:top>
          <span class="text-h6" >Produtos</span>
          <q-space />
          <q-input outlined dense debounce="300" v-model="filter" placeholder="Procurar" class="q-mr-sm">
            <template v-slot:append>
              <q-icon name="mdi-magnify" />
            </template>
          </q-input>
        </template>

        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-3"  >

            <q-card class="cursor-pointer" v-ripple:primary @click="handleShowDetails(props.row)">

              <q-img :src="props.row.img_url" :ratio="4/3" />

              <q-card-section class="text-center">
                <div class="text-h6">{{ props.row.name }}</div>
                <div class="text-subtitle">{{ formatCurrency(props.row.price) }}</div>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12" v-if="props.rowIndex === 3 && brand.paralax_url" key="paralax">
            <q-parallax :height="200" :speed="0.5">
              <template v-slot:media>
                <img :src="brand.paralax_url">
              </template>
              <h3 class="text-white">{{ brand.name }}</h3>
            </q-parallax>
          </div>

        </template>

      </q-table>
    </div>
    <div class="row justify-center">
      <q-pagination
        v-model="initialPagination.page"
        :max="pagesNumber"
        direction-links
        @update:model-value="handleScrollToTop"
      />
    </div>
    <dialog-product-details
      :show="showDialogDetails"
      :product="productDetails"
      @hide-dialog="showDialogDetails = false"
    />



  </q-page>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue'
import useApi from 'src/composables/UseApi';
import { useRoute } from 'vue-router';
import useNotify from 'src/composables/UseNotify';
import { columnsProduct, initialPagination } from './table'
import { formatCurrency } from 'src/utils/format'
import DialogProductDetails from 'components/DialogProductDetails.vue';
import useBrand from 'src/composables/UseBrand';



const table = "product"
const products = ref([])
const loading = ref(true)
const filter = ref('')
const showDialogDetails = ref(false)
const productDetails = ref({})
const optionsCategories = ref([])
const categoryId = ref('')

const route = useRoute()
const { listPublic } = useApi()
const { notifyError } = useNotify()
const  { brand } = useBrand()

const handleListProducts = async (userId) => {
  try {
    loading.value = true
    products.value = categoryId.value ? await listPublic(table, userId, 'category_id', categoryId.value.id) : await listPublic(table, userId)
    loading.value = false
  } catch (error) {
    notifyError(error.message)
  }
}

const handleShowDetails = (product) => {
  productDetails.value = product
  showDialogDetails.value = true
}

const handleListCategories = async (userId) => {
  optionsCategories.value = await listPublic('category', userId)

}

const handleScrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}


onMounted(() => {
  if (route.params.id){
    handleListCategories(route.params.id)
    handleListProducts(route.params.id)
  }
})

const pagesNumber = computed(() =>
  Math.ceil(products.value.length / initialPagination.value.rowsPerPage)
)




</script>
