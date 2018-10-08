/**
 * @constructor
 * @return {object} L' objet app
 */

class App {
    constructor() {
        this.map = new MyMap(document.getElementById('map'))
        this.restaurants = []

        this.fetchRestaurants();
        this.initFilters();
    }

    initFilters() {
        $("#slider-range").slider({
            range: true,
            min: 0,
            max: 5,
            values: [2, 5],
            slide: (event, ui) => {
                $("#amount").val(ui.values[0] + " étoiles" + "  -  " + ui.values[1] + " étoiles");
                this.setFilter({ stars: { min: ui.values[0], max: ui.values[1] } });
            }
        });
        $("#amount").val($("#slider-range").slider("values", 0) + " étoiles" + "  -  " +
            $("#slider-range").slider("values", 1) + " étoiles");
    }

    setFilter(filters) {
        this.map.reset();

        this.restaurants
            .filter(r => {
                if (r.average >= filters.stars.min && r.average <= filters.stars.max) {
                    return true;
                }
            })
            .forEach(r => this.addRestaurant(r));
    }

    addRestaurant(restaurant) {
        this.map.addRestaurant(restaurant);
    }

    fetchRestaurants() {
        this.ajaxGet("http://localhost/json/restaurant.json", response => {
            // Transforme la réponse en tableau d'objets JavaScript
            this.restaurants = JSON.parse(response).map(r => new Restaurant(r));
            // var viewRestaurants = document.getElementById("restaurants");
            // Affiche le titre de chaque restaurant
            this.restaurants.forEach(r => this.addRestaurant(r));
        });
    }

    ajaxGet(url, callback) {
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
}

function initApp() {
    const app = new App();
}