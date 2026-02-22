<script setup lang="ts">
import { ref, watch } from 'vue'
import { Search, Pointer, LocateFixedIcon, ChevronUp} from 'lucide-vue-next'

// =========================
// PROPS
// =========================
const props = defineProps<{
  start?: string
  end?: string
}>()

// =========================
// EMITS
// =========================
const emit = defineEmits(['update:start', 'update:end', 'ver-rota'])

// =========================
// ESTADO LOCAL
// =========================
const startInput = ref(props.start ?? '')
const endInput = ref(props.end ?? '')

console.log('[FormRoute] mounted com props:', {
  start: props.start,
  end: props.end
})

// =========================
// INPUT HANDLERS
// =========================
function onStartInput(e: Event) {
  const value = (e.target as HTMLInputElement).value
  startInput.value = value

  console.log('[FormRoute] digitando START:', value)

  emit('update:start', value)
}

function onEndInput(e: Event) {
  const value = (e.target as HTMLInputElement).value
  endInput.value = value

  console.log('[FormRoute] digitando END:', value)

  emit('update:end', value)
}

// =========================
// BOTÃO BUSCAR
// =========================
function onSearchClick() {
  console.log('[FormRoute] BOTÃO VER ROTA CLICADO')

  emit('ver-rota')
}

// =========================
// SINCRONIZAÇÃO COM PAI
// =========================
watch(
  () => props.start,
  (val) => {
    console.log('[FormRoute] prop start atualizada pelo pai:', val)
    startInput.value = val ?? ''
  }
)

watch(
  () => props.end,
  (val) => {
    console.log('[FormRoute] prop end atualizada pelo pai:', val)
    endInput.value = val ?? ''
  }
)
</script>

<template>
  <aside class="w-[35%] h-full p-6 z-20 flex flex-col">
    <div class="sidebar-glass h-full rounded-3xl p-8 flex flex-col custom-scroll overflow-y-auto">
      
      <!-- Título e descrição -->
      <div class="mb-10">
        <h1 class="text-4xl font-black text-slate-900 leading-tight mb-3">
          Fluxo <br/>da Cidade <span class="text-blue-600">Moderna</span>
        </h1>
        <p class="text-slate-500 text-sm font-medium tracking-wide">
          Next-generation route intelligence for the modern commuter.
        </p>
      </div>

      <!-- Inputs -->
      <div class="space-y-6 mb-10">
        <div class="space-y-3">
          <!-- Início -->
          <div class="relative group">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 text-xl">
              <Pointer class="text-blue-500" />
            </span>
            <input
              v-model="startInput"
              @input="onStartInput"
              placeholder="Localização da Partida"
              type="text"
              class="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 placeholder:text-slate-400 font-medium transition-all"
            />
          </div>

          <!-- Alternar início/fim -->
          <div class="flex justify-center -my-1 pb-4">
            <div class="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer shadow-sm">
              <ChevronUp class="text-blue-600" />
            </div>
          </div>

          <!-- Fim -->
          <div class="relative group">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 text-xl">
              <LocateFixedIcon class="text-blue-600" />
            </span>
            <input
              v-model="endInput"
              @input="onEndInput"
              placeholder="Localização do Destino"
              type="text"
              class="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 placeholder:text-slate-400 font-medium transition-all"
            />
          </div>
        </div>

        <!-- Botão Ver Rota -->
        <button
          @click="onSearchClick"
          class="w-full cursor-pointer bg-blue-600 text-white py-4 rounded-2xl font-black tracking-widest uppercase text-xs hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3"
        >
          <Search class="text-white text-lg" />
          Ver Rota
        </button>
      </div>

      <!-- Transportes e status (mantidos) -->
      <!-- ... aqui fica seu código original para modos e status ... -->
    </div>
  </aside>
</template>