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

// Création d'une requête HTTP
var req = new XMLHttpRequest();
// Requête HTTP GET synchrone vers le fichier langages.txt publié localement
req.open("GET", "http://localhost/json/restaurant.json", false);
// Envoi de la requête
req.send(null);
// Affiche la réponse reçue pour la requête
console.log(req.responseText);