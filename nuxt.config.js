
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      // { rel="apple-touch-icon", sizes="180x180", href="/apple-touch-icon.png"},
      // {rel="icon", type="image/png", sizes="32x32", href="/favicon-32x32.png"},
      // {rel="icon" ,type="image/png", sizes="16x16", href="/favicon-16x16.png"},
      // { rel="manifest", href="/site.webmanifest"},
      
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    //  {src: '~/plugins/chart.js', mode: 'client'},
    { src: "~/plugins/vue.plugin.js", ssr: false },
  
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/composition-api/module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  // build: {
  //   transpile: ['chart.js']
  // }
}
