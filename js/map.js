/**
 * @constructor
 * @return {object} L' objet map
 */
class MyMap  {
    this.map = "" // l'api google n'est pas encore chargé
    this.PlaceService = ""
    this.restaurants = restaurant
}

/**
 * Initailse la map en la centrant par défaut sur Paris
 */

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

//crer un objet Ajax.js -------------------------------------------------------------------


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


