<script setup lang="ts">
import { ref, watch } from 'vue'
import { Search, ChevronUp, Pointer, LocateFixedIcon } from 'lucide-vue-next'

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
const emit = defineEmits(['update:start', 'update:end', 'ver-rota', `limpar-rotas`])

// =========================
// ESTADO LOCAL
// =========================
const startInput = ref(props.start ?? '')
const endInput = ref(props.end ?? '')

const startSuggestions = ref<string[]>([])
const endSuggestions = ref<string[]>([])

const loadingStart = ref(false)
const loadingEnd = ref(false)

// =========================
// DEBOUNCE CONTROL
// =========================
let startTimeout: ReturnType<typeof setTimeout> | null = null
let endTimeout: ReturnType<typeof setTimeout> | null = null

function debounceStartSearch(value: string) {
  if (startTimeout) clearTimeout(startTimeout)

  startTimeout = setTimeout(() => {
    fetchLocations(value, 'start')
  }, 400)
}

function debounceEndSearch(value: string) {
  if (endTimeout) clearTimeout(endTimeout)

  endTimeout = setTimeout(() => {
    fetchLocations(value, 'end')
  }, 400)
}

// =========================
// CHAMADA À API
// =========================
async function fetchLocations(query: string, type: 'start' | 'end') {

  if (!query.trim() || query.trim().length < 2) {
    if (type === 'start') startSuggestions.value = []
    else endSuggestions.value = []
    return
  }

  if (type === 'start') loadingStart.value = true
  else loadingEnd.value = true

  try {
    const response = await fetch(
      `http://localhost:8080/locations?query=${encodeURIComponent(query.trim())}`
    )

    if (!response.ok) return

    const data = await response.json()
    if (!Array.isArray(data)) return

    if (type === 'start') {
      startSuggestions.value = data
    } else {
      endSuggestions.value = data
    }

  } catch (error) {
    console.error('[FormRoute] Erro ao buscar sugestões:', error)
  } finally {
    if (type === 'start') loadingStart.value = false
    else loadingEnd.value = false
  }
}


//Function para limpar filtros
async function clearFilters() {
  try {
    startInput.value = ''
    endInput.value = ''
    startSuggestions.value = []
    endSuggestions.value = []

    emit('update:start', '')
    emit('update:end', '')

    emit('limpar-rotas')
  } catch (error) {
  console.error('Erro ao limpar filtros:', error)
}
}
// =========================
// WATCHERS MELHORADOS
// =========================
watch(startInput, (val) => {
  emit('update:start', val)

  // Se já foi selecionado da lista, limpa sugestões
  if (startSuggestions.value.includes(val)) {
    startSuggestions.value = []
    return
  }

  debounceStartSearch(val)
})

watch(endInput, (val) => {
  emit('update:end', val)

  if (endSuggestions.value.includes(val)) {
    endSuggestions.value = []
    return
  }

  debounceEndSearch(val)
})

// Sincronização com pai
watch(() => props.start, (val) => {
  startInput.value = val ?? ''
})

watch(() => props.end, (val) => {
  endInput.value = val ?? ''
})


function handleSelection(value: string | null, type: 'start' | 'end') {
  if (!value) return

  if (value.includes('-')) {
    const [startRaw = '', endRaw = ''] = value.split('-')

    const start = startRaw.trim()
    const end = endRaw.trim()

    if (start && end) {
      startInput.value = start
      endInput.value = end

      emit('update:start', start)
      emit('update:end', end)

      startSuggestions.value = []
      endSuggestions.value = []
    }

    return
  }

  // seleção normal
  if (type === 'start') {
    startInput.value = value
    emit('update:start', value)
    startSuggestions.value = []
  } else {
    endInput.value = value
    emit('update:end', value)
    endSuggestions.value = []
  }
}
// =========================
// BOTÃO VER ROTA
// =========================
function onSearchClick() {
  if (!startInput.value || !endInput.value) {
    console.warn('Preencha início e destino')
    return
  }

  emit('ver-rota')
}
</script>

<template>
  <aside
    class="
      fixed md:relative
      bottom-0 left-0
      w-full md:w-[35%]
      h-[50%]  md:h-full
      bg-white
      md:rounded-4xl
      z-30
      p-6
      shadow-2xl md:shadow-none
      transition-all duration-300
      flex flex-col
    "
  >
    <!-- Barra indicadora (mobile only) -->
    <div class="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6 md:hidden"></div>

    <!-- Conteúdo scrollável -->
    <div class="flex-1 overflow-y-auto">
      
      <!-- Título -->
      <div class="mb-6 md:mb-10">
        <h1 class="text-2xl md:text-4xl font-black text-slate-900 leading-tight mb-3">
          Fluxo <br />
          da Cidade <span class="text-blue-600">Moderna</span>
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
            <v-combobox
              v-model="startInput"
              :items="startSuggestions"
              label="Localização da Partida"
              variant="outlined"
              clearable
              hide-details
              :loading="loadingStart"
              @update:modelValue="(val) => handleSelection(val, 'start')"
            >
              <template #prepend-inner>
                <Pointer class="text-blue-500" />
              </template>
            </v-combobox>
          </div>

          <!-- Botão alternar -->
          <div class="flex justify-center -my-1 pb-4">
            <div
              class="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer shadow-sm"
            >
              <ChevronUp class="text-blue-600" />
            </div>
          </div>

          <!-- Fim -->
          <div class="relative group">
            <v-combobox
              v-model="endInput"
              :items="endSuggestions"
              label="Localização do Destino"
              variant="outlined"
              clearable
              hide-details
              :loading="loadingEnd"
              @update:modelValue="(val) => handleSelection(val, 'end')"
            >
              <template #prepend-inner>
                <LocateFixedIcon class="text-blue-500" />
              </template>
            </v-combobox>
          </div>
        </div>

        <!-- Botão Ver Rota -->
        <button
          @click="onSearchClick"
          class="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold uppercase text-sm md:text-xs hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-3"
        >
          <Search class="text-white text-lg" />
          Ver Rota
        </button>

        <!-- Botão Limpar -->
        <button
          @click="clearFilters"
          class="w-full bg-slate-200 text-slate-700 py-3 rounded-2xl font-bold uppercase text-xs hover:bg-slate-300 transition-all shadow-sm"
        >
          Limpar Filtros
        </button>

      </div>
    </div>
  </aside>
</template>