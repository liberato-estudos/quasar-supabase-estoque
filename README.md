# Quasar App (quasar-supabase-estoque)

Repositório Github Projeto
https://github.com/patrickmonteiro/quasar-estoque-supabase

A Quasar Project

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).


# Supabase

## Info
```
Projeto: estoque
Senha:   cC#nNX7bL#xRUw3
```

## Install

Guide: https://supabase.com/docs/guides/with-vue-3

Adicionar o supabase no projeto
```bash
yarn add @supabase/supabase-js
```

Criar o arquivo de inicialização do supabase no diretório `boot`.

#### **`@/boot/supabase.js`**
```js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

console.log('init supabase', supabase)

export default function useSupabase() {
  return { supabase }
}
```

Adicionar a inicialização do supabase no boot na configuração do quasar.

#### **`@/quasar.config.js`**
```js
boot: [
      'supabase',
      //...
    ],
```

# Parte 2

## Composable
Referências:

- https://vueschool.io/articles/vuejs-tutorials/what-is-a-vue-js-composable/

- https://vuejs.org/guide/reusability/composables.html#mouse-tracker-example

Criar a pasta `@/composables`

Criar o composable para autenticação:

#### **`@/composables/useAuthUser.js`**
```js

import { ref } from 'vue'
import useSupabase from 'boot/supabase'

const user = ref(null)


export default function useAuthUser () {


    const { supabase } = useSupabase()

    const login = async ({email, password}) => {

        const { user, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        return user
    }

    const loginWithSocialProvider = async (provider) => {
        const {user, error} = await supabase.auth.signIn(provider)
        if (error) throw error
        return user
    }

    const logout = async () => {
        const {error} = await supabase.auth.signOut()
    }

    const isLoggedIn = () => {
        return !!user.value
    }

    const register = async ({email, password, ...meta}) => {
        const { user, error } = await supabase.auth.signUp(
            { email, password },
            {
                data: meta,
                redirectTo: '${window.location.origin}/me?fromEmail=registrationConfirmation'
            }
        )
        if (error) throw error
        return user
    }

    const update = async (data) => {
        const { user, error } = await supabase.auth.update(data)
        if (error) throw error
        return user
    }

    const sendPasswordResetEmail = async (email) => {
        const { user, error } = await supabase.auth.api.resetPasswordForEmail(email)
        if (error) throw error
        return user

    }

    return {
        user,
        login,
        loginWithSocialProvider,
        logout,
        isLoggedIn,
        register,
        update,
        sendPasswordResetEmail
    }
}
```

Alterar o vueRouterMode

```
vueRouterMode: 'hash', // available values: 'hash', 'history'
```
## Plugins

Dialog
https://quasar.dev/quasar-plugins/dialog


Dependências
- https://www.npmjs.com/package/uuid
