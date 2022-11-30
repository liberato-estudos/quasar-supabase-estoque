import useSupabase from "src/boot/supabase";
import useAuthUser from "./UseAuthUser";

export default function userApi() {
  const  { supabase } = useSupabase()
  const { user } = useAuthUser()

  const list = async (table) => {
    const { data, error } = await supabase.from(table).select();

    if (error) throw error
    return data
  };
  const getById = async (table, id) => {
    const { data, error } = await supabase.from(table).select('*').eq('id', id);
    if (error) throw error
    return data[0]
    // O selec traz um array como resultado. Como estamos buscando por um id único, retornamos a primeira posição desse array
  };
  const post = async (table, form) => {
    const { data, error } = await supabase.from(table).insert({
      ...form,
      user_id: user.value.id
    })
    if (error) throw error
    return data
  };

  const update = async (table, form) => {
    const { data, error } = await supabase.from(table).update({...form}).eq('id', form.id)
    if (error) throw error
    return data
  };

  const remove = async (table, id) => {
    const { data, error } = await supabase.from(table).delete().eq('id', id)
    if (error) throw error
    return data
  };

  return {
    list,
    getById,
    post,
    update,
    remove
  };
}
