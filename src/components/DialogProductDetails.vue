<template>
  <q-dialog
  :full-width="$q.platform.is.mobile"
    :model-value="show"
    @before-hide="handleClose"
  >

    <q-card>
      <q-card-section>
        <div class="text-h6">
          Detalhes
        </div>
      </q-card-section>

      <q-card-section v-if="product.img_url">
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

      <q-card-actions align="right">
        <q-btn label="Cancelar" color="primary" outline v-close-popup />
        <q-btn
          v-if="brand.phone"
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
import { openURL } from 'quasar';
import useBrand from 'src/composables/UseBrand';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  product: Object
})
const emit = defineEmits(['hideDialog'])

const { brand } = useBrand()

const handleClose = () => {

  emit('hideDialog')

}

const handleSendWhats = () => {

  const msg = 'Olá, fiquei interessado no produto: '
  const link = encodeURI(`https://api.whatsapp.com/send?phone=55${brand.value.phone}&text=${msg} - ${props.product.name} - ${formatCurrency(props.product.price)}`)
  openURL(link)
}

</script>
