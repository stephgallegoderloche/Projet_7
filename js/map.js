/**
 * @constructor
 * @return {object} L' objet map
 */
function myMap () {
    this.map = ""; // l'api google n'est pas encore chargé
    this.PlaceService = "";
}

/**
 * Initailse la map en la centrant par défaut sur Paris
 */
myMap.prototype.initMap = function () {
    this.map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 48.8534100,
            lng: 2.3488000
        },
        zoom: 14,
    });
    var pos = {
        lat: 48.8534100,
        lng: 2.3488000
    }
    var marker = new google.maps.Marker({
        position: pos,
        map: this.map,
        title:"Ici",
        animation: google.maps.Animation.DROP,
        icon: 'https://.png'
    })
    
    this.PlaceService = new google.maps.places.PlacesService(this.map);
}
function initMap() {
    var myLatLng = { lat: -25.363, lng: 131.044 };

    // Create a map object and specify the DOM element
    // for display.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 4
    });

    // Create a marker and set its position.
    var marker = new google.maps.Marker({
        map: map,
        position: myLatLng,
        title: 'Hello World!'
    });
}


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
    var viewRestaurants = document.getElementById("restautants");
    // Affiche le titre de chaque restaurant
    restaurants.forEach(function (restaurant) {
       // Crée une ligne de tableau HTML pour chaque tableau
       var viewRestaurant = document.createElement("div");
       viewRestaurant.setAttribute('class','restaurant');
       viewRestaurant.innerHTML = 
       `<div class="col-md-12 restaurantName text-bold">` + restaurant.restaurantName + `</div>` 
       + `<div class="col-md-12 address">` + restaurant.address + `</div>` 
       +`<div class="col-md-3 ratingsStars">` + restaurant.ratings[0].stars + `</div>`
       +`<div class="col-md-9 ratingsComment">` + restaurant.ratings[1].comment + `</div>`;
       viewRestaurants.appendChild(viewRestaurant);
       //console.log(restaurant.ratings[0].stars);
       });
});