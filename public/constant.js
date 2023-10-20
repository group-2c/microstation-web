const env = import.meta.env
const appName = window.APP_NAME || env.VITE_APP_NAME
const appCopyright = window.APP_COPYRIGHT || env.VITE_APP_COPYRIGHT
const apiURL = window.API_URL || env.VITE_APP_API_URL
const mapURL = window.MAP_URL || env.VITE_APP_MAP_URL
const mqttHost = window.MQTT_HOST || env.VITE_MQTT_HOST
const mqttPort = window.MQTT_PORT || env.VITE_MQTT_PORT
const mqttEndPoint = window.MQTT_END_POINT || env.VITE_MQTT_END_POINT
const mqttTopic = window.MQTT_TOPIC || env.VITE_MQTT_TOPIC
const mapCenter = [
  window.MAP_CENTER_LAT || env.VITE_APP_MAP_CENTER_LAT,
  window.MAP_CENTER_LON || env.VITE_APP_MAP_CENTER_LON
]
const mapZoom = window.MAP_ZOOM || env.VITE_APP_MAP_ZOOM

const Constant = {
  appName,
  appGlobalVar: "MICROSTATION",
  appCopyright,
  apiURL,
  mapURL,
  mapCenter,
  mapZoom,
  mapOptions: {
    zoomControl: false,
    attributionControl: false
  },
  mapKey: "8a7504018a36b6b541c5b0a078ca1cc0",
  mqttOptions: {
    host: mqttHost,
    port: mqttPort,
    endpoint: mqttEndPoint,
    topic: mqttTopic,
    connectTimeout: 4000, 
    reconnectPeriod: 4000, 
  }
}

window.document.title = appName

export default Constant