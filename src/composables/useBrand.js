
import { ref } from "vue";
import { setCssVar } from "quasar";
import useAuthUser from "./UseAuthUser";
import useApi from "./UseApi";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";

const brand = ref({
  primary: '',
  secondary: '',
  name: '',
  phone: '',
})

export default function useBrand(){

  const { user } = useAuthUser()
  const { listPublic } = useApi()
  const route = useRoute()
  const $q = useQuasar()

  const setBrand = (primary, secondary) => {
    if (primary)   setCssVar('primary', primary)
    if (secondary) setCssVar('secondary', secondary)
  }

  const getBrand = async () => {
    const id = route.params.id || user?.value?.id

    if (id) {
      // $q.loading.show({
      //   backgroundColor: 'dark',
      // })
      try{
        const data = await listPublic('config', id)

        if (data.length > 0) {
          brand.value = data[0]
          setBrand(brand.value.primary, brand.value.secondary)
        }

      }catch(error){
        throw error
      }
      // $q.loading.hide()
      return brand.value
    }
  }

  return {
    brand,
    setBrand,
    getBrand,

  }

}
