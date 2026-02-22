<script setup lang="ts">
import { ref } from 'vue'
import Navbar from '../../components/layout/Navbar.vue'
import FormRoute from '../../components/FormRoute.vue'
import Mapa from '../../components/Mapa.vue'

const startLocation = ref('')
const endLocation = ref('')


const mapRef = ref<any>(null)

function onVerRotaClick() {
  mapRef.value?.fetchRouteBuses(startLocation.value, endLocation.value)
}
</script>

<template>
  <div class="h-screen flex flex-col overflow-hidden bg-[#f8fafc]">
    <Navbar />

    <main class="flex-1 flex pt-20 overflow-hidden relative">
      <FormRoute
      v-model:start="startLocation"
      v-model:end="endLocation"
      @ver-rota="onVerRotaClick"
    />

      <Mapa ref="mapRef" />
    </main>
  </div>
</template>