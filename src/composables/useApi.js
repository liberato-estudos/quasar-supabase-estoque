import useSupabase from "src/boot/supabase";
import useAuthUser from "./UseAuthUser";
import { v4 as uuidv4 } from 'uuid';

export default function userApi() {
  const  { supabase } = useSupabase()
  const { user } = useAuthUser()

  const list = async (table) => {
    const { data, error } = await supabase.from(table).select();

    if (error) throw error
    return data
  }

  const listPublic = async (table, userId) => {
    const { data, error } = await supabase.from(table).select().eq('user_id', userId);

    if (error) throw error
    return data
  }

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

  const uploadImg = async (file, storage) => {
    const filename = uuidv4()
    const { data, error } = await supabase
      .storage
      .from(storage)
      .upload(filename, file, {
        cacheControl: '3600',
        upsert: false
      })
    const publicUrl = await getUrlPublic(filename, storage)

    if (error) throw error
    return publicUrl
  }

  const getUrlPublic = async (filename, storage) => {
    // const { publicURL, error } = await supabase
    //   .storage
    //   .from(storage)
    //   .getPublicUrl(filename)

    //   if (error) throw error
    // return publicURL

    // deu diferença da versão 1 para 2 do supabase
    const { data } = supabase
      .storage
      .from(storage)
      .getPublicUrl(filename)
    return data.publicUrl

  }

  return {
    list,
    listPublic,
    getById,
    post,
    update,
    remove,
    uploadImg,
    getUrlPublic
  };
}
