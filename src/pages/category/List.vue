<template>
  <q-page padding>

    <div class="row">


      <q-table title="Category" :rows="categories" :columns="columns" row-key="id" class="col-12" :loading="loading">

        <template v-slot:top>
          <span class="text-h6">Categoria</span>
          <q-space />
          <q-btn label="Novo" color="primary" />


        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
           <q-btn icon="mdi-pencil-outline" color="secondary" dense size="sm">
            <q-tooltip>Editar</q-tooltip>
           </q-btn>
           <q-btn icon="mdi-delete-outline" color="negative" dense size="sm">
            <q-tooltip>Apagar</q-tooltip>
           </q-btn>

          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import useApi from 'src/composables/useApi';
import useNotify from 'src/composables/UseNotify';

const columns = [

  { name: 'name', align: 'left', label: 'Nome', field: 'name', sortable: true },
  { name: 'actions', align: 'right', label: 'Ações', field: 'actions', sortable: true },

]

const categories = ref([])
const loading = ref(true)
const { list } = useApi()
const { notifyError } = useNotify()


const handleListCategories = async () => {
  try {
    loading.value = true
    categories.value = await list('category')
    loading.value = false
  } catch (error) {
    notifyError(error.message)
  }
}

onMounted(() => {
  handleListCategories()
})

</script>
