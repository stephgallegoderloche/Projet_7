/**
 * Nos restaurants
 * @constructor
 * @return { object}            L ' objet restaurant
 * 
 * @param {object} (position)     La latitude et longitude du restaurant
 * @param {string} (name)         Le nom du restaurant
 * @param {string} (adress)       L' adresse du restaurant
 * @param {number} (average)      La note moyenne du restaurant
 * @param {object} (photos)       Photo retourné par l' API du restaurant
 * @param {object} (commentsJson) Indique si l' item est à prendre dans la base JSON ou dans l'API
 */
class Restaurant {
    constructor(data) {
        this.name               = data.restaurantName
        this.adress             = data.adress
        this.ratings            = data.ratings
        this.position           = {
                                    lat: data.lat,
                                    lng: data.long
                                  }
        this.average            = this.getAverageFromRating()
        this.element            = document.getElementById(data.id)

        this.creatRestaurantView();
    }
    getLabel() {
        return `${this.name} ${this.average}`;
    }
    getAverageFromRating() {
        let score = 0

        this.ratings.forEach((ratings) => {
            score += ratings.stars
        })
        let average = score / this.ratings.length
        return average
    }
    getElement() {
        this.element.addEventListener("click", () => {

        })
    }
    
    creatRestaurantView() {
        var viewRestaurant = document.createElement("div");

        viewRestaurant.setAttribute('class', 'restaurant');
        viewRestaurant.innerHTML = `<div>` + this.printRatings + `< /div>`
           
    }
    printRatings(){  
        let string =""

        this.ratings.forEach((rating) => {
            spring += ` < div class = "col-md-12 ratingsStars text-bold" > $ {this.stars} < /div> <div class = "col-md-12 ratingsComment" > $ {this.comment} < /div>`
        })
    return string
    }
    starsAverageRestaurant() {
        let note = this.average

        for ( var i = 1; i < 5; i++){
            if ( i > note ){
                `<img src="img/starOk.png" alt="logo_onResTôt" class="img-responsive" `
            }else{
                if ( note > i + 0.5 ){
                    `<img src="img/star.png" alt="logo_onResTôt" class="img-responsive" `
                }else{
                    `<img src="img/starMid.png" alt="logo_onResTôt" class="img-responsive" `
                }
            }               
        }
    }
}

