/**
 * @constructor
 * @return {object} L' objet app
 */

class App {
    constructor() {
        this.map            = new MyMap(
                              /* recherche l'element avec id map */
                              document.getElementById('map'),
                              /*quand on selectionne un restaurant */
                              restaurant =>this.selectRestaurant(restaurant),
                              /*quand on click sur la map on récupère l'adresse et les coordonnées */
                              (address, latLng) => this.newRestaurant.addNewRestaurant(address,latLng),
                              /*quand on récupère les restaurants autour de ma position*/
                              resultsRestaurants => resultsRestaurants.forEach(restaurant => this.addNewRestaurant(restaurant)),
                              /*quand on drag la map*/
                              _ => this.resetAll()
                              )
        this.liste          = new RestaurantListe(document.getElementById('restautants'),
                              restaurant => this.selectRestaurant(restaurant))
        this.newRestaurant  =  new NewRestaurant(document.getElementById('newrestaurant'),
                              restaurant => this.addNewRestaurant(restaurant) )
        this.restaurants    = []
        

        this.fetchRestaurants();
        this.initFilters();
        this.refresh();
    }
/*Supprime toute la liste des restaurants*/
    resetAll(){
        this.map.reset()
        this.liste.reset()
        this.restaurants = []
    }
/*Fait la liaison entre la map et la liste des restaurants*/
    selectRestaurant(restaurant){
        this.map.onSelectRestaurant(restaurant)
        this.liste.onSelectRestaurant(restaurant)
    }
/*Initialise le filte d'étoiles*/
    initFilters() {
        $("#slider-range").slider({
            range: true,
            min: 0,
            max: 5,
            values: [0, 5],
            slide: (event, ui) => {
                $("#amount").val(ui.values[0] + " étoiles" + "  -  " + ui.values[1] + " étoiles");
                this.setFilter({ stars: { min: ui.values[0], max: ui.values[1] } });
            }
        });
        $("#amount").val($("#slider-range").slider("values", 0) + " étoiles" + "  -  " +
            $("#slider-range").slider("values", 1) + " étoiles");
    }
/*Met a jour la liste des restaurants/marker d'après le filtre*/
    setFilter(filters) {
        this.map.reset()
        this.liste.reset()

        this.restaurants
            .filter(r => {
                if (r.average >= filters.stars.min && r.average <= filters.stars.max) {
                    return true;
                }
            })
            .forEach(r => this.addRestaurant(r))
            
            console.log(this.liste)
    }
/*Ajoute les restaurants*/
    addRestaurant(restaurant) {
        this.map.addRestaurant(restaurant)
        this.liste.addRestaurant(restaurant)
    }
    addNewRestaurant(restaurant){
        this.restaurants.push(restaurant)
        this.addRestaurant(restaurant)
    }

/*Récupérer les restaurant du fichier Json*/
    fetchRestaurants() {
        this.ajaxGet("http://localhost/json/restaurant.json", response => {
            // Transforme la réponse en tableau d'objets JavaScript
            const restaurants = JSON.parse(response).map(r => new Restaurant(r))
            // Affiche le titre de chaque restaurant
            restaurants.forEach((r, index) => this.addNewRestaurant(r,index))
            setTimeout(_=>this.map.setDragListener(),5000)
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
            console.error("Erreur réseau avec l'URL " + url)
        });
        restaurants.send(null);
    }
    /**
     * Bouton pour rafraichir la page
     */
    refresh() {
        let button = document.getElementById('refresh')

        button.addEventListener('click', function () {
            window.location.reload();
        })
    }

}

function initApp() {
    const app = new App();
}