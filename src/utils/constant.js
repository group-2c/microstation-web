const Constant = {
  appGlobalVar: "MICROSTATION",
  mapOptions: {
    zoomControl: false,
    attributionControl: false
  },
  mapKey: "8a7504018a36b6b541c5b0a078ca1cc0",
  mqttOptions: {
    host: window.envConfig.VUE_MQTT_HOST,
    port: window.envConfig.VUE_MQTT_PORT,
    username: window.envConfig.VUE_MQTT_USER_NAME,
    password: window.envConfig.VUE_MQTT_PASSWORD,
    endpoint: window.envConfig.VUE_MQTT_END_POINT,
    connectTimeout: 4000, 
    reconnectPeriod: 4000, 
  }
}

export default Constant