/**
 * @constructor
 * @return {object} L' objet map
 */

class MyMap  {
    constructor(){
        
        this.restaurants    = [] 
    }
    
}
maMap = new MyMap()

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
        }, 
        
         () =>{
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    /*() => {*/
        console.log("ouiiiiiii")
        maMap.restaurants.forEach((restaurant) => {
                
            var pos = {
            lat: restaurant.position.lat,
            lng: restaurant.position.lng
            };

            var titleInfo = `${restaurant.name} ${restaurant.average}`
            var markerResto = new google.maps.Marker({
                map: this.map,
                position: pos,
                title: titleInfo,
                animation: google.maps.Animation.DROP,
                icon: 'img/resto-location.png',
            })
        }) 
    /* }*/
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: Le service de Geolocation a échoué.' :
        'Error: Votre navigateur ne supporte pas la géolocalisation.');
    infoWindow.open(map);
}



//-----------------------------------------------------------------------------------------
/**

*/
// Création d'une requête HTTP
var req = new XMLHttpRequest();
// Requête HTTP GET synchrone vers le fichier langages.txt publié localement
req.open("GET", "http://localhost/json/restaurant.json", false);
// Envoi de la requête
req.send(null);
// Affiche la réponse reçue pour la requête

// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
function ajaxGet(url, callback) {
    var restaurants = new XMLHttpRequest();
    restaurants.open("GET", url);
    restaurants.addEventListener("load", function () {
        if (restaurants.status >= 200 && restaurants.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(restaurants.responseText);
        } else {
            console.error(restaurants.status + " " + restaurants.statusText + " " + url);
        }
    });
    restaurants.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    restaurants.send(null);
}
//Rechercher le nom de tous les restaurants dans le fichier JSON
ajaxGet("http://localhost/json/restaurant.json", function (reponse) {
    // Transforme la réponse en tableau d'objets JavaScript
    var restaurants = JSON.parse(reponse);
    var viewRestaurants = document.getElementById("restaurants");
    // Affiche le titre de chaque restaurant
   
    restaurants.forEach(function (restaurant) {
        let resto = new Restaurant(restaurant)
        maMap.restaurants.push(resto)
        resto.creatRestaurantView()
    });
    
});
