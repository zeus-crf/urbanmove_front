<script setup lang="ts">
import { Bus } from 'lucide-vue-next';


</script>

<template>
  <header
    class="
      hidden md:flex
      sticky top-0
      h-20
      glass-light
      z-50
      items-center
      justify-between
      px-8
      border-b border-slate-200/50
    "
  >
    <!-- Logo -->
    <div class="flex items-center gap-3">
      <div class="bg-blue-600 p-2 rounded-xl">
        <Bus class="text-white text-2xl" />
      </div>

      <span class="text-xl font-extrabold tracking-tight text-slate-900">
        Urban<span class="text-blue-600">Move</span>
      </span>
    </div>

    <!-- Navegação -->
    <nav class="flex items-center gap-10">
      <a class="text-blue-600 font-bold text-sm tracking-wide" href="#">
        Dashboard
      </a>
      <a class="nav-link" href="#">Routes</a>
      <a class="nav-link" href="#">Real-time</a>
      <a class="nav-link" href="#">Schedule</a>
    </nav>

    <!-- Ações -->
    <div class="flex items-center gap-6">
      <button
        class="text-slate-600 text-sm font-semibold hover:text-blue-600 transition-colors"
      >
        Sign In
      </button>

      <button
        class="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
      >
        Get Started
      </button>
    </div>
  </header>
</template>