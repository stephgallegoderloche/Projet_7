/**
 * @constructor
 * @return {object} L' objet map
 */

class MyMap  {
    constructor(mapElement) {
        this.mapElement = mapElement;
        this.map;
        this.restaurants = [] 
        this.infoWindow = new google.maps.InfoWindow;
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
            animation: google.maps.Animation.DROP,
            icon: 'img/resto-location.png',
        })

        this.markers.push(markerResto);
    }

    addMarker(options) {
        return new google.maps.Marker({ ...options, map: this.map });
    }

    initMap() {
        this.map = new google.maps.Map(this.mapElement, this.defaultMapParams);
        
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

    handleLocationError(browserHasGeolocation, pos) {
        this.infoWindow.setPosition(pos);
        this.infoWindow.setContent(browserHasGeolocation ?
            'Error: Le service de Geolocation a échoué.' :
            'Error: Votre navigateur ne supporte pas la géolocalisation.');
        this.infoWindow.open(this.map);
    }
}
