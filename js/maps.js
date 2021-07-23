(() => {

  class UserLocation {
    static get(callback) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((location) => {
          callback({
            lat: location.coords.latitude,
            lng: location.coords.longitude
          })
        })
      } else {
        alert('No pudimos detectar en donde te encuentras')
      }
    }
  }

  const myPlace = {
    lat: -34.9166209,
    lng: -58.3844921
  }


  google.maps.event.addDomListener(window, 'load', () => {
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 20,
      center: myPlace,
    })
    const svgMarker = {
      path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
      fillColor: "blue",
      fillOpacity: 0.6,
      strokeWeight: 0,
      rotation: 0,
      scale: 2,
    }
    const marker = new google.maps.Marker({
      map: map,
      position: myPlace,
      visible: true,
      title: 'Restaurant',
      icon: svgMarker,
    })
  })

  UserLocation.get((coords) => {
    //Calcular la distancia del restaurante al usuario
    const origin = new google.maps.LatLng(coords.lat, coords.lng)
    const destiny = new google.maps.LatLng(myPlace.lat, myPlace.lng)
    const service = new google.maps.DistanceMatrixService()
    service.getDistanceMatrix({
        origins: [origin],
        destinations: [destiny],
        travelMode: 'DRIVING',
      },
      (response, status) => {
        if (status === 'OK') {
          let origins = response.originAddresses;
          let destinations = response.destinationAddresses;
          const durationElements = response.rows[0].elements[0]
          const travelDuration = durationElements.duration.text;
          document.querySelector('#message').innerHTML = ` Estas a ${travelDuration} de una noche inolvidable en <span class="dancing-script medium">Restaurant</span>`
        }
      })
  })
})()