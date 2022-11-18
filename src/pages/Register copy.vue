<template>
    <q-page padding>
        <q-form class="row justify-center" @submit.prevent="handleRegister">
            <p class="col-12 text-h5 text-center">Register</p>
            <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
                <q-input label="Nome" v-model="form.name" outlined />
                <q-input label="Email" v-model="form.email" outlined />
                <q-input label="Password" v-model="form.password" outlined />
                <div class="full-width q-pt-md">
                    <q-btn label="Register" color="primary" class="full-width" size="lg" type="submit" />
                </div>

            </div>
        </q-form>
    </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuthUser from 'src/composables/UseAuthUser'

const router = useRouter()
const { register } = useAuthUser()

const form = ref({
    name: '',
    email: '',
    password: ''
})

const handleRegister = async () => {
    try {
        const user = await register(form.value)
        console.log('register ', user)
        // router.push({
        //     name: 'email-confirmation' ,
        //     query: {email: form.value.email}
        // })
    } catch (error) {
        alert(error.message)

    }
}
</script>
