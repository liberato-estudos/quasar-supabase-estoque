<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Produtos Estoque
        </q-toolbar-title>

        <dark-toggle-mode />
        <q-btn-dropdown flat color="white" icon="person">
          <q-list>
            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list class="text-secondary" >
        <q-item-label header>
          Menu
        </q-item-label>

        <!-- <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" /> -->
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import EssentialLink from 'components/EssentialLink.vue'
import { useRouter } from 'vue-router'
import useAuthUser from 'src/composables/UseAuthUser'
import useBrand from 'src/composables/UseBrand'

import DarkToggleMode from 'src/components/DarkToggleMode.vue'

const linksList = [
{
    title: 'Home',
    caption: '',
    icon: 'mdi-home',
    routeName: 'home'
  },
  {
    title: 'Categoria',
    caption: '',
    icon: 'mdi-shape-outline',
    routeName: 'category'
  },
  {
    title: 'Produto',
    caption: '',
    icon: 'mdi-archive',
    routeName: 'product'
  },
  {
    title: 'Config',
    caption: '',
    icon: 'mdi-cog',
    routeName: 'form-config'
  }

]

onMounted( async () => {
  $q.loading.show({
        backgroundColor: 'dark',
  })

  await getBrand()

  $q.loading.hide()
})

const leftDrawerOpen = ref(false)
const $q = useQuasar()
const router = useRouter()
const { logout } = useAuthUser()
const { getBrand } = useBrand()

const handleLogout = async () => {
  $q.dialog({
    title: 'Logout',
    message: 'Voc?? deseja sair?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    await logout()
    router.replace({name: 'login'})
  })
}

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

</script>

