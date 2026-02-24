<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useToast, TYPE } from 'vue-toastification'
import axios from 'axios'

const mapContainer = ref<HTMLDivElement | null>(null)
let map: L.Map | null = null
let eventSource: EventSource | null = null

const toast = useToast()

// 🔵 Armazena markers ativos
let busMarkersSSE: Record<string, L.Marker> = {}

// 🔵 Rotas ativas (vazio = mostra todos)
const activeRouteIds = ref<string[]>([])
const shouldFocusOnFilter = ref(false);

// ======================================
// Ícone SVG (sempre azul)
// ======================================
function createBusSvgIcon() {
  const size = 36
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-color="#000" flood-opacity="0.4"/>
        </filter>
      </defs>
      <g filter="url(#shadow)">
        <rect x="8" y="14" width="48" height="28" rx="6" ry="6" fill="#1e90ff" />
        <rect x="12" y="20" width="12" height="10" rx="1" ry="1" fill="#fff" />
        <rect x="40" y="20" width="12" height="10" rx="1" ry="1" fill="#fff" />
        <circle cx="22" cy="46" r="4" fill="#000" />
        <circle cx="42" cy="46" r="4" fill="#000" />
      </g>
    </svg>`

  return L.divIcon({
    className: '',
    html: `<div style="display:flex; align-items:center; justify-content:center; width:${size}px; height:${size}px;">${svg}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  })
}

// ======================================
// Inicializa mapa + SSE
// ======================================
onMounted(() => {
  if (!mapContainer.value) return

  map = L.map(mapContainer.value).setView([-23.02836, -43.56266], 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  // 🔥 Conexão SSE
  eventSource = new EventSource('http://localhost:8080/onibus/stream')

  eventSource.onmessage = (event) => {
    let parsed: any
    try {
      parsed = JSON.parse(event.data)
    } catch {
      return
    }

    const buses = Array.isArray(parsed) ? parsed : [parsed]

 const bounds = L.latLngBounds([])
let visibleCount = 0

buses.forEach(bus => {
  const key = String(bus.id)
  const lat = Number(bus.latitude)
  const lng = Number(bus.longitude)

  if (!isFinite(lat) || !isFinite(lng)) return

  const linha = bus.linha

  if (
    activeRouteIds.value.length &&
    !activeRouteIds.value.includes(linha)
  ) {
    if (busMarkersSSE[key]) {
      map?.removeLayer(busMarkersSSE[key])
      delete busMarkersSSE[key]
    }
    return
  }

  visibleCount++
  bounds.extend([lat, lng])

  if (!busMarkersSSE[key]) {
    const marker = L.marker([lat, lng], {
      icon: createBusSvgIcon()
    }).addTo(map!)

    marker.bindPopup(`Linha: ${linha}`)
    busMarkersSSE[key] = marker
  } else {
    busMarkersSSE[key].setLatLng([lat, lng])
  }
})

// 🔥 Focar apenas uma vez após filtrar
if (
  shouldFocusOnFilter.value &&
  visibleCount > 0 &&
  bounds.isValid()
) {
  map?.fitBounds(bounds, { padding: [60, 60], maxZoom: 16 })
  shouldFocusOnFilter.value = false
}
  }
})

// ======================================
// Função chamada pelo formulário
// ======================================
async function fetchRouteBuses(start?: string, end?: string) {

  if (!start && !end) {
    activeRouteIds.value = []

    shouldFocusOnFilter.value = true // opcional
    
    toast('Filtro limpo com sucesso! 🚌', {
      type: TYPE.SUCCESS,
      toastClassName: 'urban-success'
    })

    return
  }

  try {
    const { data } = await axios.get(
      `http://localhost:8080/onibus/routes?start=${encodeURIComponent(start ?? '')}&end=${encodeURIComponent(end ?? '')}`
    )

    if (!data || !Array.isArray(data)) {
      toast('Erro ao buscar rota ❌', {
        type: TYPE.ERROR
      })
      return
    }

    activeRouteIds.value = [
      ...new Set(data.map(bus => bus.routeId))
    ]

    shouldFocusOnFilter.value = true

    if (activeRouteIds.value.length === 0) {
      toast('Nenhuma rota encontrada com esse filtro 🚫', {
        type: TYPE.INFO,
        toastClassName: 'urban-info'
      })
      return
    }

    toast(`Filtro aplicado! ${activeRouteIds.value.length} rotas encontradas 🚌`, {
      type: TYPE.SUCCESS,
      toastClassName: 'urban-success'
    })

  } catch (err) {
    toast('Erro no servidor 🚨', {
      type: TYPE.ERROR,
      toastClassName: 'urban-error'
    })
  }
}

defineExpose({ fetchRouteBuses, clearMarkersNotInActiveRoutes })


// Limpar markers de rotas filtradas quando o filtro é limpo
function clearMarkersNotInActiveRoutes() {
  Object.keys(busMarkersSSE).forEach(key => {
    const marker = busMarkersSSE[key]
    if (!marker) return
    const popupContent = marker.getPopup()?.getContent() as string
    const match = popupContent.match(/Linha: (\d+)/)
    const linha = match ? match[1] : null

    if (
      linha &&
      activeRouteIds.value.length &&
      !activeRouteIds.value.includes(linha)
    ) {
      map?.removeLayer(marker)
      delete busMarkersSSE[key]
    }
  })
}
// ======================================
onBeforeUnmount(() => {
  if (eventSource) {
    eventSource.close()
    eventSource = null
  }
})
</script>

<template>
  <div
    ref="mapContainer"
    class="
      absolute md:relative
      inset-0
      w-full
      h-full
      z-0
    "
  ></div>
</template>