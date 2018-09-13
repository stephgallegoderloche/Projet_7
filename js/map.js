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
    this.getJson("../js/restaurants.json");
    this.PlaceService = new google.maps.places.PlacesService(this.map);
}
function initMap() {
    // The location of Uluru
    var uluru = {lat: -25.344, lng: 131.036};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: uluru});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: uluru, map: map});
  }