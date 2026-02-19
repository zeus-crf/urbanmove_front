<script setup lang="ts">
import Navbar from '../../components/layout/Navbar.vue';
import FormRoute from '../../components/FormRoute.vue';
import Mapa from '../../components/Mapa.vue';
</script>

<template>
  <div class="h-screen flex flex-col overflow-hidden bg-[#f8fafc]">
    <!--NavBar-->
    <Navbar />
    <main class="flex-1 flex pt-20 overflow-hidden relative">
      <!--Formulário de destino-->
      <FormRoute />
      <!--Mapa-->
      <Mapa />
    </main>
  </div>
</template>
