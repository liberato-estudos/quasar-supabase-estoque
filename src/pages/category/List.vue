<template>
  <q-page padding>

    <div class="row">


      <q-table title="Category" :rows="categories" :columns="columnsCategory" row-key="id" class="col-12" :loading="loading"
        sortBy="name">

        <template v-slot:top>
          <span class="text-h6">Categoria</span>
          <q-space />
          <q-btn v-if="$q.platform.is.desktop" label="Novo" color="primary" icon="mdi-plus" :to="{ name: 'form-category'}" />


        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn icon="mdi-pencil-outline" color="secondary" dense size="sm" @click="handleEdit(props.row)">
              <q-tooltip>Editar</q-tooltip>
            </q-btn>
            <q-btn icon="mdi-delete-outline" color="negative" dense size="sm" @click="handleRemove(props.row)">
              <q-tooltip>Apagar</q-tooltip>
            </q-btn>

          </q-td>
        </template>
      </q-table>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn v-if="$q.platform.is.mobile" fab icon="mdi-plus" color="primary" :to="{ name: 'form-category'}"/>
    </q-page-sticky>
  </q-page>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import useApi from 'src/composables/UseApi';
import useNotify from 'src/composables/UseNotify';
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import useAuthUser from 'src/composables/UseAuthUser';
import { columnsCategory } from './table'



const categories = ref([])
const loading = ref(true)

const table = "category"
const { listPublic, remove } = useApi()
const { notifyError, notifySuccess } = useNotify()
const { user } = useAuthUser()
const router = useRouter()
const $q = useQuasar()


const handleListCategories = async () => {
  try {
    loading.value = true
    categories.value = await listPublic(table, user.value.id)
    loading.value = false
  } catch (error) {
    notifyError(error.message)
  }
}

const handleEdit = (category) => {
  router.push({ name: 'form-category', params: { id: category.id } })
}

const handleRemove = async (category) => {
  try {
    $q.dialog({
      title: 'Confirm',
      message: `Voc?? quer realmente remover ${category.name}`,
      cancel: true,
      persistent: true
    }).onOk(async () => {
      await remove(table, category.id)
      notifySuccess("Removido com sucesso")
      handleListCategories()
    })
  } catch (error) {
    notifyError(error.message)
  }
}

onMounted(() => {
  handleListCategories()
})

</script>
