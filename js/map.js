/**
 * @constructor
 * @return {object} L' objet map
 */

class MyMap  {
    constructor(mapElement, onClickMarker) {
        this.mapElement = mapElement
        this.onClickMarker = onClickMarker
        this.onClickMap = onClickMap
        this.restaurants = [] 
        this.infoWindow = new google.maps.InfoWindow
        this.geocoder   = new google.maps.Geocoder
    
        this.markers = []
        this.defaultMapParams = {
            center: {
                // Paris
                lat: 48.8534100,
                lng: 2.3488000
            },
            zoom: 13
        }

        this.initMap();
    }
    
    reset() {
        this.markers.forEach(m => m.setMap(null));
        this.markers = [];
        this.restaurants = [];
    }

    addRestaurant(restaurant) {
        this.restaurants.push(restaurant)

        const markerResto = this.addMarker({
            restaurant: restaurant,
            position: {
                lat: restaurant.position.lat,
                lng: restaurant.position.lng
            },
            title: restaurant.getLabel(),
            //content: restaurant.getLabel(),
            animation: google.maps.Animation.DROP,
            icon: 'img/resto-location.png',
        })

        this.markers.push(markerResto);
        markerResto.addListener('click',  _=>this.selectRestaurant(restaurant));
    }
    onSelectRestaurant(restaurant){
        //this.imgStreetView(restaurant)
        this.infoWindow.setContent(`<span> ${restaurant.name} </span><span> ${restaurant.address} </span>`)
        this.infoWindow.open(this.map,this.markers.find(m=>m.restaurant.address === restaurant.address));
    }
    
//afficher une image grace a streetView
    imgStreetView() {
        var request = {
            query: 'Museum of Contemporary Art Australia',
            fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry'],
        };

        this.placesService.findPlaceFromQuery(request, viewPlaces());
    }
    selectRestaurant(restaurant){
        if (typeof (this.onClickMarker)=== 'function'){
            
            this.onClickMarker(restaurant)
        }
    }
    addMarker(options) {
        return new google.maps.Marker({ ...options, map: this.map });
    }
    addMyPosition(){

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                //My Position
                var marker = this.addMarker({
                    position: pos,
                    title: "Vous êtes ici",
                    animation: google.maps.Animation.DROP,
                    icon: 'img/my-location.png'
                })

                this.infoWindow.open(this.map);
                this.map.setCenter(pos);
            },

                () => this.handleLocationError(true, this.map.getCenter()));
        } else {
            // Browser doesn't support Geolocation
            this.handleLocationError(false, this.map.getCenter());
        }
    }
    initMap() {
        this.map = new google.maps.Map(this.mapElement, this.defaultMapParams);
        this.addMyPosition()
        //this.placesService = new google.maps.PlacesService(this.map);
        google.maps.event.addListener(this.map, 'click', event => this.onClick(event))
        
    }
    onClick(event){
        this.geocodeLatLng(event.latLng, address =>{
            debugger
        })
    }
    
    geocodeLatLng(latlng, callback) {
        
        this.geocoder.geocode({ 'location': latlng }, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    let address = results[0].formatted_address
                    callback(address)
                } else {
                    window.alert('aucun résultat trouvé')
                }
            } else {
                window.alert('Geocoder a échoué à cause de ' + status)
            }
        })
        
    }
    handleLocationError(browserHasGeolocation, pos) {
        this.infoWindow.setPosition(pos);
        this.infoWindow.setContent(browserHasGeolocation ?
            'Error: Le service de Geolocation a échoué.' :
            'Error: Votre navigateur ne supporte pas la géolocalisation.');
        this.infoWindow.open(this.map);
    }
    


}
