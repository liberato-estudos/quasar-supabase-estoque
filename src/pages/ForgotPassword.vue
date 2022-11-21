<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleForgotPassword">
      <p class="col-12 text-h5 text-center"> Recuperar Senha </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">

        <q-input label="Email" v-model="email" lazy-rules
          :rules="[val => (val && val.length > 0) || 'E-mail é obrigatório']" type="email" />


        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn label="Recuperar a Senha" color="primary" class="full-width" outline rounded type="submit" />

          <q-btn label="Voltar" color="dark" class="full-width" rounded flat :to="{ name: 'login' }" />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>

import { ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser';
import useNotify from 'src/composables/UseNotify'

const email = ref('')
const { sendPasswordRestEmail } = useAuthUser()
const { notifyError, notifySuccess } = useNotify()

const handleForgotPassword = async () => {
  try {
    await sendPasswordRestEmail(email.value)
    notifySuccess(`O link para a troca de senha foi enviado para o email: ${email.value}`)
  } catch (error){
    notifyError(error.message)
  }
}

</script>
