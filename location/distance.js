const userLocation = [25.0337335, 121.5636135]
const showLocation = [25.0363267, 121.4304662]

const distance = (lat1, lng1, lat2, lng2) => {
  if (lat1 === lat2 && lng1 === lng2) {
    return 0
  } else {
    const radlat1 = (Math.PI * lat1) / 180
    const radlat2 = (Math.PI * lat2) / 180
    const theta = lng1 - lng2
    const radtheta = (Math.PI * theta) / 180
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
    if (dist > 1) {
      dist = 1
    }
    dist = ((Math.acos(dist) * 180) / Math.PI) * 60 * 1.1515 * 1.609344
    return dist
  }
}

console.log(
  distance(userLocation[0], userLocation[1], showLocation[0], showLocation[1])
)
