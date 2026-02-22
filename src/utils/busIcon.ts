import * as L from 'leaflet'
import type { BusIconOptions } from '../interfaces/BusIconOptions'

export function createBusSvgIcon(options: BusIconOptions = {}): L.DivIcon {
  const color = options.color ?? '#1e90ff'
  const size = options.size ?? 36   
  const rotation = options.rotation ?? 0

  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="14" width="48" height="28" rx="6" ry="6" fill="${color}" />
      <rect x="12" y="20" width="12" height="10" rx="1" ry="1" fill="#fff" />
      <rect x="40" y="20" width="12" height="10" rx="1" ry="1" fill="#fff" />
      <!-- Rodinhas pretas -->
      <circle cx="22" cy="46" r="4" fill="#000" />
      <circle cx="42" cy="46" r="4" fill="#000" />
    </svg>
  `

  const html = `<div style="transform: rotate(${rotation}deg); display:flex; align-items:center; justify-content:center; width:${size}px; height:${size}px;">${svg}</div>`

  return L.divIcon({
    className: '',
    html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  })
}