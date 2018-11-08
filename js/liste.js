/**
 * @constructor
 * @return {object} L' objet map
 */

class RestaurantListe {
    constructor(listeElement,onClick) {
        this.element = listeElement
        this.restaurants = []
        this.onClick = onClick
        
    }
    addRestaurant(restaurant){
        this.element.appendChild(restaurant.creatRestaurantView(this.onClick))
        this.restaurants.push(restaurant)
    }
    reset() {
        this.element.innerHTML = ''
        this.restaurants = []
    }
    onSelectRestaurant(restaurant){
        this.closeAllRestaurant()
        restaurant.viewDetailsComments()

    }
    closeAllRestaurant(){
        this.restaurants.forEach(r=>r.closeDetailComment())
    }
}