<script lang="ts" setup>
import { Home, Map, User } from 'lucide-vue-next';
</script>
<template>
  <footer
    class="
      fixed
      bottom-0
      left-0
      w-full
      h-16
      bg-white
      border-t
      border-slate-200
      flex
      items-center
      justify-around
      z-40
      shadow-lg
    "
  >
    <button class="flex flex-col items-center text-slate-600 text-xs">
      <Home  />
      Início
    </button>

    <button class="flex flex-col items-center text-slate-600 text-xs">
      <Map />
      Rotas
    </button>

    <button class="flex flex-col items-center text-slate-600 text-xs">
      <User  />
      Perfil
    </button>
  </footer>
</template>