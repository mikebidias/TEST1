import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export interface LatLng {
  lat: number
  lng: number
}

// Repère aux couleurs Komot (évite les icônes PNG par défaut de Leaflet, que les
// bundlers ne résolvent pas).
const pinIcon = L.divIcon({
  className: '',
  html: `<svg width="36" height="44" viewBox="0 0 24 24" fill="#ffc300" stroke="#1a1a1a" stroke-width="1.5" stroke-linejoin="round" style="filter:drop-shadow(0 2px 3px rgba(0,0,0,.4))"><path d="M12 22s7-6.6 7-11.5A7 7 0 1 0 5 10.5C5 15.4 12 22 12 22Z"/><circle cx="12" cy="10.5" r="2.6" fill="#1a1a1a"/></svg>`,
  iconSize: [36, 44],
  iconAnchor: [18, 44],
})

function ClickHandler({ onPick }: { onPick: (p: LatLng) => void }) {
  useMapEvents({ click: (e) => onPick({ lat: e.latlng.lat, lng: e.latlng.lng }) })
  return null
}

/** Recentre la carte quand la position change depuis l'extérieur (GPS, saisie manuelle). */
function Recenter({ position }: { position: LatLng | null }) {
  const map = useMap()
  useEffect(() => {
    if (position) map.setView([position.lat, position.lng], Math.max(map.getZoom(), 16))
  }, [position, map])
  return null
}

/** Carte OpenStreetMap : toucher pour placer le repère, glisser pour l'ajuster. */
export function LocationPicker({
  position,
  onChange,
  center,
  height = 280,
}: {
  position: LatLng | null
  onChange: (p: LatLng) => void
  center: LatLng
  height?: number
}) {
  return (
    <div className="rounded-md overflow-hidden" style={{ height, border: '1px solid var(--border-default)' }}>
      <MapContainer
        center={[(position ?? center).lat, (position ?? center).lng]}
        zoom={position ? 16 : 13}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler onPick={onChange} />
        <Recenter position={position} />
        {position && (
          <Marker
            position={[position.lat, position.lng]}
            icon={pinIcon}
            draggable
            eventHandlers={{
              dragend: (e) => {
                const ll = (e.target as L.Marker).getLatLng()
                onChange({ lat: ll.lat, lng: ll.lng })
              },
            }}
          />
        )}
      </MapContainer>
    </div>
  )
}
