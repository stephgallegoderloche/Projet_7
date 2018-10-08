/**
 * @constructor
 * @return {object} L' objet map
 */

class RestaurantListe {
    constructor(listeElement) {
        this.element = listeElement
        this.restaurants = []
        
    }
    addRestaurant(restaurant){
        this.element.appendChild(restaurant.creatRestaurantView())
    }
    reset() {
        this.element.innerHTML = ''
    }
}