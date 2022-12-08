<template>
  <q-page padding>
    <!-- <div v-if="user">
      <p>Olá {{ user.user_metadata.name }}</p>
      <p>Olá {{ user.email }}</p>
      <p>Olá {{ user }}</p>
    </div> -->
    <div class="row q-col-gutter-md">
      <div class="col-md-4 col-xs-12 col-sm-6">
        <card-dashboard
          table="category"
          label="Categorias"
          icon="mdi-shape-outline"
        />
      </div>

      <div class="col-md-4 col-xs-12 col-sm-6">
        <card-dashboard
          table="product"
          label="Produtos"
          icon="mdi-archive"
        />
      </div>
    </div>

  </q-page>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
import useAuthUser from 'src/composables/UseAuthUser';

const { user } = useAuthUser()
const cardDashboard = defineAsyncComponent(() => import('src/components/CardDashboard.vue'))

</script>
