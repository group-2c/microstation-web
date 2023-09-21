/*
 * @author: zzp
 * @date: 2023-08-29 10:50:32
 * @fileName: map.js
 * @filePath: src/views/Dashboard/map.js
 * @description: 地图相关
 */

/**
 * 创建Marker
 * @param {*} param0 
 * @returns 
 */
const newMarker = ({ 
  iconUrl,
  data,
  iconSize = [83, 160],
  iconAnchor = [40, 130],
}) => {
  const icon = new T.Icon({
    iconUrl,
    iconSize: new T.Point(iconSize[0], iconSize[1]),
    iconAnchor: new T.Point(iconAnchor[0], iconAnchor[1])
  })
  const marker = new T.Marker(new T.LngLat(data.longitude, data.latitude), { icon: icon })
  marker.data = data
  return marker
}



export {
  newMarker
}