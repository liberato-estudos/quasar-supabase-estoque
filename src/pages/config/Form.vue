<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">
          Configurações
        </p>
      </div>
      <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handleSubmit">

        <q-input
          label="Nome do armazenamento"
          v-model="form.name"
          :rules="[val => (val && val.length > 0) || 'Nome é obrigatório']"
        />
        <q-input
          label="Telefone"
          v-model="form.phone"
          mask="(##) #####-####"
          unmasked-value
        />
        <q-input
          label="Imagem Parallax"
          stack-label
          v-model="paralax"
          type="file"
          accept="image/*"
        />

        <div class="row justify-center q-gutter-md q-pa-md" >
            <q-color v-model="form.primary" class="col-md-4 col-sm-12 col-xs-12"/>
            <q-color v-model="form.secondary" class="col-md-4 col-sm-12 col-xs-12"/>

        </div>

        <q-btn
          label="Salvar"
          color="primary" class="full-width"
          rounded
          type="submit"
        />

        <q-btn
          label="Cancelar"
          color="primary"
          class="full-width"
          rounded
          flat
          :to="{name: 'category'}"
        />

      </q-form>
    </div>

  </q-page>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import useApi from 'src/composables/useApi';
import useNotify from 'src/composables/UseNotify';
import useBrand from 'src/composables/useBrand';

const router = useRouter()

const { post, update, uploadImg } = useApi()
const { notifyError, notifySuccess } = useNotify()
const { setBrand, getBrand } = useBrand()

const table = 'config'
let config = {}
const paralax = ref([])

const form = ref({
  name: '',
  phone:'',
  primary:'',
  secondary:'',
  paralax_url:''
})

onMounted(() => {
    handleGetConfig()
})


const handleSubmit = async () => {
  try {
    if (paralax.value.length > 0){
      const paralaxUrl = await uploadImg(paralax.value[0], 'paralax') // products é o nome do storage
      form.value.paralax_url = paralaxUrl
    }

    if (form.value.id) { // se existir estou fazendo um update
      await update(table, form.value)
      notifySuccess("Atualizado com sucesso")
    } else {
      await post(table, form.value)
      notifySuccess("Cadastrado com sucesso")
    }
    setBrand(form.value.primary, form.value.secondary)
    router.push({name: 'home'})

  } catch (error) {
    notifyError(error.message)
  }

}


const handleGetConfig = async () => {
  try {

    const brand = await getBrand()
    form.value = brand


  } catch (error) {
    notifyError(error.message)
  }
}

</script>
