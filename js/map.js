/**
 * @constructor
 * @return {object} L' objet map
 */
function myMap () {
    this.map = ""; // l'api google n'est pas encore chargé
    this.PlaceService = "";
}

/**
 * Initailse la map (par défaut sur Paris)
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
