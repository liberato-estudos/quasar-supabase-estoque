<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handlePasswordReset">
      <p class="col-12 text-h5 text-center"> Recuperar Senha </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">

        <q-input label="Nova senha" v-model="password" lazy-rules
          :rules="[val => (val && val.length >= 6) || 'Password is required']" />


        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn label="Cadastrar nova senha" color="primary" class="full-width" outline rounded type="submit" />

        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useAuthUser from 'src/composables/UseAuthUser';
import useNotify from 'src/composables/UseNotify'

const { resetPassword } = useAuthUser()
const { notifyError, notifySuccess } = useNotify()
const password = ref('')

const router = useRouter()

// capturar o token do link
const route = useRoute()
const token = route.query.token

const validacaoEmail = [val => (val && val.length > 0) || 'E-mail é obrigatório']

const handlePasswordReset = async () => {
  try {
    await resetPassword(token, password.value)
    notifySuccess('Nova senha cadastrada')
    router.push({ name: 'login' })
  } catch (error) {
    notifyError(error.message)
  }
}

</script>
