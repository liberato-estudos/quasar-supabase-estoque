<template>
  <q-dialog
  :full-width="$q.platform.is.mobile"
    :model-value="show"
    @before-hide="handleClose"
  >

    <q-card
      class="cursor-pointer"
    >
      <q-card-section>
        <div class="text-h6">
          Detalhes
        </div>
      </q-card-section>

      <q-card-section>
        <q-img :src="product.img_url" :ratio="(4/3)" style="min-width: 300px"/>
      </q-card-section>

      <q-card-section>
        <div class="text-h6">
          {{ product.name }}
        </div>
        <div class="text-subtitle2">
          {{ formatCurrency(product.price) }}
        </div>
        <!-- o v-html está sendo usado para manter a formatação realizada pelo editor utilizado no formulário -->
        <div class="text-body2" v-html="product.description">
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn label="Cancelar" color="primary" v-close-popup />
        <q-btn
          label="Fazer pedido"
          icon="mdi-whatsapp"
          color="green-7"
          @click="handleSendWhats"
        />
      </q-card-actions>

    </q-card>

  </q-dialog>
</template>

<script setup>
import { formatCurrency } from 'src/utils/format';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  product: Object
})
const emit = defineEmits(['hide'])


const handleClose = () => {
  emit('hide')
}

const handleSendWhats = () => {
  alert("enviado")
}

</script>
