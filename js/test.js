/*
*dans init map


let geocoder = new google.maps.geocoder

        google.maps.event.addListener
*/
 


geocodeLatLng(geocoder, map, latlg){
        let address = null
        geocoder.geocode({'location': latlng}, (results,status) => {
            if (status === 'OK'){
                if (results[0]){
                    address = results[0].formatted_address
                } else {
                    window.alert('aucun résultat trouvé')
                }
            } else{
                window.alert('Geocoder a échoué à cause de ' + status)
            }
        })
        return address
    }