import { createClient } from '@supabase/supabase-js'
<<<<<<< HEAD
import useAuthUser from 'src/composables/UseAuthUser'
=======
import useAuthUser from '@/composables/useAuthUser'
>>>>>>> parent of 276b0c8 (troca de @/ por ../)

// const supabaseUrl = 'https://xxboqoluuaowghbtyqfh.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4Ym9xb2x1dWFvd2doYnR5cWZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjcyMjMzNzQsImV4cCI6MTk4Mjc5OTM3NH0.oR-XInHqTsSoaqVW_swqOFf0xfzr1EYzA2MvdQP-bAI'


const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)


supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser()



  user.value = session?.user || null
})

export default function useSupabase() {
    return { supabase }
}
