<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Quasar Estoque
        </q-toolbar-title>
      </q-toolbar>
    </q-header>



    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted } from 'vue'
import useBrand from 'src/composables/useBrand'
import { useQuasar } from "quasar";

const { getBrand } = useBrand()
const $q = useQuasar()

onMounted( async () => {
  $q.loading.show({
    backgroundColor: 'dark',
  })

  await getBrand()

  $q.loading.hide()
})



</script>
