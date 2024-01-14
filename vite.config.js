import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import autoImport from 'unplugin-auto-import/vite'
import { VarletUIResolver } from 'unplugin-vue-components/resolvers'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
        resolvers : [VantResolver() , VarletUIResolver() , ElementPlusResolver()]
    }),
      autoImport({
        resolvers : [VarletUIResolver({autoImport : true}) , ElementPlusResolver()],
      })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  }
})