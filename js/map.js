/**
 * @constructor
 * @return {object} L' objet map
 */
/**
class MyMap  {
    this.map = "" // l'api google n'est pas encore chargé
    this.PlaceService = ""
    this.restaurants = restaurant
}
*/
/**
 * Initailse la map en la centrant par défaut sur Paris
 */

var map, infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 13
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var marker = new google.maps.Marker({
                position: pos,
                map: this.map,
                title: "Vous êtes ici",
                animation: google.maps.Animation.DROP,
                icon: 'img/my-location.png'
            })
            
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: Le service de Geolocation a échoué.' :
        'Error: Votre navigateur ne supporte pas la géolocalisation.');
    infoWindow.open(map);
}

//-----------------------------------------------------------------------------------------

//Rechercher le nom de tous les restaurants dans le fichier JSON
ajaxGet("http://localhost/json/restaurant.json", function (reponse) {
    // Transforme la réponse en tableau d'objets JavaScript
    var restaurants = JSON.parse(reponse);
    var viewRestaurants = document.getElementById("restautants");
    // Affiche le titre de chaque restaurant
    restaurants.forEach(function (restaurant) {
        let resto = new Restaurant (restaurant)
        this.restaurants.push(resto)
        resto.creatRestaurantView()
       });
});


