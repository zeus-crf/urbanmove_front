<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// --- Referência do container do mapa ---
const mapContainer = ref<HTMLDivElement | null>(null)
let map: L.Map
let busMarkers: Record<string, L.Marker> = {} // Marcadores por ID
let eventSource: EventSource | null = null
let boundsAjustados = false // controla ajuste inicial do zoom

// --- Helper: cria ícone SVG de ônibus ---
function createBusSvgIcon(options: { color?: string; size?: number; rotation?: number } = {}) {
  const color = options.color ?? '#1e90ff'
  const size = options.size ?? 36
  const rotation = options.rotation ?? 0

  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-color="#000" flood-opacity="0.4"/>
        </filter>
      </defs>
      <g filter="url(#shadow)">
        <rect x="8" y="14" width="48" height="28" rx="6" ry="6" fill="${color}" />
        <rect x="12" y="20" width="12" height="10" rx="1" ry="1" fill="#fff" />
        <rect x="40" y="20" width="12" height="10" rx="1" ry="1" fill="#fff" />
        <circle cx="22" cy="46" r="4" fill="#333" />
        <circle cx="42" cy="46" r="4" fill="#333" />
      </g>
    </svg>`

  const html = `<div style="transform: rotate(${rotation}deg); display:flex; align-items:center; justify-content:center; width:${size}px; height:${size}px;">${svg}</div>`

  return L.divIcon({
    className: '',
    html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  })
}

const maxInitialMarkers = 50

onMounted(() => {
  console.log('Mapa.vue -> onMounted', mapContainer.value)

  if (!mapContainer.value) {
    console.error('Erro: container do mapa não encontrado!')
    return
  }

  // --- Inicializa mapa ---
  map = L.map(mapContainer.value).setView([-23.02836, -43.56266], 13)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)
  console.log('Mapa inicializado:', map)

  // --- Conexão SSE ---
  eventSource = new EventSource('http://localhost:8080/onibus/stream', { withCredentials: true })
  console.log('SSE criado:', eventSource)
  
  eventSource.onopen = () => console.log('SSE conectado!')

  eventSource.onmessage = (event) => {
    let parsed: any
    try {
      parsed = JSON.parse(event.data)
    } catch (err) {
      console.error('Erro ao parsear event.data:', err, event.data)
      return
    }

    const buses = Array.isArray(parsed) ? parsed : [parsed]
    console.log('SSE buses (normalized array):', buses)

    // --- só os primeiros 50 ---
    const busesToShow = buses.slice(0, maxInitialMarkers)

    if (busesToShow.length === 0) return

    const bounds = L.latLngBounds([])

    busesToShow.forEach((bus: any) => {
      const { id, linha, placa, latitude, longitude } = bus
      const lat = Number(latitude)
      const lng = Number(longitude)

      if (!isFinite(lat) || !isFinite(lng)) {
        console.warn('Ônibus com coordenadas inválidas', bus)
        return
      }

      const key = String(id ?? `${lat},${lng}`)

      if (!busMarkers[key]) {
        const rotation = Number(bus.heading ?? bus.course ?? bus.bearing ?? 0)
        const iconToUse = createBusSvgIcon({ color: '#1e90ff', size: 40, rotation })

        const marker = L.marker([lat, lng], { icon: iconToUse }).addTo(map)
        marker.bindPopup(`Linha: ${linha}<br>Placa: ${placa}`)
        busMarkers[key] = marker
        console.log('Marker criado:', key, lat, lng)
      } else {
        const rotation = Number(bus.heading ?? bus.course ?? bus.bearing ?? 0)
        busMarkers[key].setIcon(createBusSvgIcon({ color: '#1e90ff', size: 40, rotation }))
        busMarkers[key].setLatLng([lat, lng])
        busMarkers[key].setPopupContent(`Linha: ${linha}<br>Placa: ${placa}`)
      }

      bounds.extend([lat, lng])
    })

    // Ajusta bounds apenas na primeira vez
    if (!boundsAjustados && Object.keys(busMarkers).length > 0 && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50] })
      boundsAjustados = true
      console.log('Bounds ajustados uma vez')
    }

    console.log('Total markers no mapa:', Object.keys(busMarkers).length)
  }

  eventSource.onerror = (err) => console.error('Erro SSE:', err)
})

onBeforeUnmount(() => {
  if (eventSource) {
    eventSource.close()
    eventSource = null
    console.log('SSE fechado')
  }
})
</script>

<template>
  <div
    ref="mapContainer"
    class="w-full h-[600px] rounded-xl shadow-lg border border-red-500"
  >
    <!-- Bordas vermelhas só para debug -->
  </div>
</template>
