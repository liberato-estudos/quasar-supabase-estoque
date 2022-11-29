<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Produtos
        </q-toolbar-title>

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
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import EssentialLink from 'components/EssentialLink.vue'
import { useRouter } from 'vue-router'
import useAuthUser from 'src/composables/UseAuthUser'

const linksList = [
{
    title: 'Home',
    caption: '',
    icon: 'mdi-home',
    routeName: 'me'
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


const leftDrawerOpen = ref(false)
const $q = useQuasar()
const router = useRouter()
const { logout } = useAuthUser()

const handleLogout = async () => {
  $q.dialog({
    title: 'Logout',
    message: 'Você deseja sair?',
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


<style scoped>
.menu-ativo {
  color: blue

}
</style>
