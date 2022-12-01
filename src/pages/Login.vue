<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-h5 text-center">Login</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input label="Email" v-model="form.email" type="email" outlined lazy-rules :rules="validacaoEmail"/>
        <q-input label="Password" v-model="form.password" type="password" outlined lazy-rules :rules="validacaoPassword"/>
        <div class="full-width q-pt-md">
          <q-btn label="Login" color="primary" class="full-width" size="lg" type="submit" />
        </div>
        <div class="full-width q-gutter-y-sm">
          <q-btn label="Cadastrar" color="primary" class="full-width" flat size="md" to="/register" />
          <q-btn label="Esqueci a senha" color="primary" class="full-width" flat size="md" :to="{name:'forgot-password'}" />
        </div>
      </div>
    </q-form>
  </q-page>

  <!-- <q-page class="bg-light-green window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">Company & Co</h5>
      </div>
      <div class="row">
        <q-card square bordered class="my-card q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square filled clearable v-model="email" type="email" label="email" />
              <q-input square filled clearable v-model="password" type="password" label="password" />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="light-green-7" size="lg" class="full-width" label="Login" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">Not reigistered? Created an Account</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page> -->

</template>

<style scoped>
.my-card {

  width: 100vw;
  max-width: 500px;
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'

const router = useRouter()
const { login, isLoggedIn } = useAuthUser()
const {notifySuccess, notifyError} = useNotify()

const form = ref({
  email: '',
  password: ''
})

// VALIDAÇÃO
const validacaoEmail = [val => (val && val.length > 0) || 'E-mail é obrigatório']
const validacaoPassword = [val => (val && val.length >= 6) || 'A senha precisa ter no mínimo 6 caracteres']



// onMounted(() => {
//   if (isLoggedIn) {
//     router.push({ name: 'home' })
//   }
// })

const handleLogin = async () => {
  try {

    await login(form.value)
    notifySuccess('Autenticado com sucesso!')
    router.push({ name: 'home' })
  } catch (error) {
    notifyError(error.message)

  }
}




</script>
