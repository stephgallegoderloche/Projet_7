/**
 * @constructor
 * @return {object} L' objet liste des restaurants
 */

class RestaurantListe {
    constructor(listeElement,onClick) {
        this.element        = listeElement
        this.restaurants    = []
        this.onClick        = onClick
        
    }
/*Ajouter un restaurant*/
    addRestaurant(restaurant){
        this.element.appendChild(restaurant.creatRestaurantView(this.onClick))
        this.restaurants.push(restaurant)
    }
    reset() {
        this.element.innerHTML = ''
        this.restaurants = []
    }
/*Affiche le commentaire du restaurant choisit*/
    onSelectRestaurant(restaurant){
        this.closeAllRestaurant()
        restaurant.viewDetailsComments()

    }
/*Fermer tous les commentaires des restaurants*/
    closeAllRestaurant(){
        this.restaurants.forEach(r=>r.closeDetailComment())
    }
}