/**
 * @constructor
 * @return {object} L' objet map
 */

class MyMap  {
    constructor(mapElement, onClickMarker, onClickMap, onLocationRestaurant) {
        this.mapElement         = mapElement
        this.onClickMarker      = onClickMarker
        this.onClickMap         = onClickMap
        this.restaurants        = [] 
        this.infoWindow         = new google.maps.InfoWindow
        this.geocoder           = new google.maps.Geocoder
        this.markers            = []
        this.defaultMapParams   = {
            center: {
                // Paris
                lat: 48.8534100,
                lng: 2.3488000
            },
            zoom: 13
        }
        this.onLocationRestaurant = onLocationRestaurant
        this.events$ = $('<div>')
        this.initMap();

    }
    
    reset() {
        this.markers.forEach(m => m.setMap(null));
        this.markers     = [];
        this.restaurants = [];
    }
/*Ajouter les restaurants, son marker/nom du restaurant + moyenne des notes */
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
    /*Action au Click sur le marker du restaurant*/
        markerResto.addListener('click',  _=>this.selectRestaurant(restaurant));
    }
/*Informations du restaurant sur la map*/
    onSelectRestaurant(restaurant){
        //this.imgStreetView(restaurant)
        this.infoWindow.setContent(`<span> ${restaurant.name} </span><span> ${restaurant.address} </span>`)
        this.infoWindow.open(this.map,this.markers.find(m=>m.restaurant.address === restaurant.address));
    }

/*Vérifie le bon restaurant*/
    selectRestaurant(restaurant){
        if (typeof (this.onClickMarker)=== 'function'){
            
            this.onClickMarker(restaurant)
            $('html,body').animate({
                scrollTop: $(restaurant.restaurantView).offset().top
            }, 'slow');
        
        }
    }
/*Ajouter un marker*/
    addMarker(options) {
        return new google.maps.Marker({ ...options, map: this.map });
    }
/*Affiche ma position avec mon marker*/
    addMyPosition(){
        /*essayer HTML5 geolocation*/
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const pos    = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                /*trouver les restaurants au tour de moi */
                this.restaurantsLocationNearbyPosition(pos,'3000')
                
                /*Ma Position*/
                const marker = this.addMarker({
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
            /*Le navigateur ne supporte pas la géolocalisation*/
            this.handleLocationError(false, this.map.getCenter());
        }
    }
/*trouver les restaurants au tour de moi */
    restaurantsLocationNearbyPosition(pos,radius){
        let location = new google.maps.LatLng(pos.lat, pos.lng)
        let request = {
            location,
            radius,
            type: ['restaurant']
        }
        this.placesService.nearbySearch(request, (results, status) => {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                
                results.forEach(r=>{
                    this.placesService.getDetails({
                        placeId           : r.place_id,
                        fields            : ['name', 'review']
                    }, (result, status) => {
                        if (status == google.maps.places.PlacesServiceStatus.OK) {
                            let restaurant = new Restaurant({
                                restaurantName      : r.name,
                                pos                 : r.geometry.location,
                                address             : r.vicinity,
                                lat                 : r.geometry.location.lat(),
                                long                : r.geometry.location.lng(),
                                ratings             : result.reviews.map(review =>{
                                    return {stars : review.rating, comment : review.text}
                                })
                            })
                            this.onLocationRestaurant([restaurant])
                        }
                    })
                    /*TODO transformer pour chaque r appeler le service googleplacedetails et appeler this.onLocationRestaurant([le resultat de]) */
                    
                })
                
            }
        })
        
    }
/*initialise la map*/
    initMap() {
        this.map = new google.maps.Map(this.mapElement, this.defaultMapParams);
        this.addMyPosition()
        this.placesService = new google.maps.places.PlacesService(this.map);

    /*Action au Click sur la map*/
        google.maps.event.addListener(this.map, 'click', event => this.onClick(event))
        
    }
/*Action du click sur la map */
    onClick(event){
        this.geocodeLatLng(event.latLng, address =>{
            if(typeof(this.onClickMap) === 'function'){
                this.onClickMap(address, event.latLng)
            }
        })
    }
/*Vérifit et récupère l'adresse trouvé*/
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
/*Erreur de géolocalissation*/
    handleLocationError(browserHasGeolocation, pos) {
        this.infoWindow.setPosition(pos);
        this.infoWindow.setContent(browserHasGeolocation ?
            'Error: Le service de Geolocation a échoué.' :
            'Error: Votre navigateur ne supporte pas la géolocalisation.');
        this.infoWindow.open(this.map);
    }
    


}
