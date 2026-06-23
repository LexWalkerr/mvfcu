// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

    app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbNKhfbF7K8h2wi1abQn3kG5hmdBtXKTdsVg&s' }
      ]
    }
  }
})
