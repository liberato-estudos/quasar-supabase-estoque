<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">
          Formulário Categoria
        </p>
      </div>
      <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handleSubmit">
        <q-input label="Nome" v-model="form.name" :rules="[val => (val && val.length > 0) || 'Nome é obrigatório']" />
        <q-btn :label="idUpdate ? 'Atualizar' : 'Salvar'" color="primary" class="full-width" rounded type="submit" />
        <q-btn label="Cancelar" color="primary" class="full-width" rounded flat :to="{name: 'category'}" />
      </q-form>
    </div>

  </q-page>

</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useApi from 'src/composables/useApi';
import useNotify from 'src/composables/UseNotify';

const table = 'category'
const router = useRouter()
const route = useRoute()
const { post, getById, update } = useApi()
const { notifyError, notifySuccess } = useNotify()


const form = ref({
  name: ''
})

const idUpdate = computed(() => route.params.id)

onMounted(() => {
  if (idUpdate.value) {
    handleGetCategory(idUpdate.value)
  }
})


const handleSubmit = async () => {
  try {
    if (idUpdate.value) {
      await update(table, form.value)
      notifySuccess("Atualizado com sucesso")
    } else {
      await post(table, form.value)
      notifySuccess("Cadastrado com sucesso")
    }
    router.push({name: 'category'})
  } catch (error) {
    notifyError(error.message)
  }

}

let category = {}
const handleGetCategory = async (id) => {
  try {
    category = await getById(table, id)
    form.value = category
  } catch (error) {
    notifyError(error.message)
  }
}

</script>
