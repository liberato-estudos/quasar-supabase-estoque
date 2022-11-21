<!-- Referência -->
<!-- https://quasar.dev/vue-components/input#internal-validation -->

<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRegister">
      <p class="col-12 text-h5 text-center"> Registro </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Nome"
          v-model="form.name"
          lazy-rules
          :rules="validacaoNome"
        />

        <q-input
          label="Email"
          v-model="form.email"
          lazy-rules
          :rules="validacaoEmail"
          type="email"
        />

        <q-input
          label="Password"
          v-model="form.password"
          lazy-rules
          :rules="validacaoPassword"
          type="password"
        />

        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Cadastrar"
            color="primary"
            class="full-width"
            outline
            rounded
            type="submit"
          />

          <q-btn
            label="Voltar"
            color="dark"
            class="full-width"
            rounded
            flat
            :to="{ name: 'login' }"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import useAuthUser from '../composables/UseAuthUser'
import useNotify from '../composables/UseNotify'
import { useRouter } from 'vue-router'

const router = useRouter()
const { register } = useAuthUser()
const { notifyError, notifySuccess } = useNotify()

const form = ref({
  name: '',
  email: '',
  password: ''
})

// VALIDAÇÃO
const validacaoNome = [val => (val && val.length > 0) || 'Nome é obrigatório']
const validacaoEmail = [val => (val && val.length > 0) || 'E-mail é obrigatório']
const validacaoPassword = [val => (val && val.length >= 6) || 'A senha precisa ter no mínimo 6 caracteres']


const handleRegister = async () => {
  try {
    await register(form.value)
    notifySuccess("Cadastro realizado com sucesso")
    // Envia para a página de confirmação de email
    router.push({
      name: 'email-confirmation',
      query: { email: form.value.email }
    })
  } catch (error) {
    notifyError(error.message)
  }
}
</script>
