<script setup lang="ts">
import { ref } from 'vue'
import Navbar from '../../components/layout/Navbar.vue'
import FormRoute from '../../components/FormRoute.vue'
import Mapa from '../../components/Mapa.vue'

import Footer from '../../components/layout/Footer.vue'


const startLocation = ref('')
const endLocation = ref('')


const mapRef = ref<any>(null)

function onVerRotaClick() {
  mapRef.value?.fetchRouteBuses(startLocation.value, endLocation.value)
}

function limparRotas() {
  mapRef.value?.fetchRouteBuses('', '')
} 


    
</script>

<template>
  <div class="h-screen flex flex-col overflow-hidden bg-[#f8fafc]">
    <Navbar class="hidden md:block" />

    <main class="flex-1 relative overflow-hidden md:flex">
      <Mapa ref="mapRef" />

      <FormRoute
        v-model:start="startLocation"
        v-model:end="endLocation"
        @ver-rota="onVerRotaClick"
        @limpar-rotas="limparRotas"
      />

      <Footer class="md:hidden"/>
  </main>
  </div>
</template>