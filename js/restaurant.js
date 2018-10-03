
class Restaurant {
    constructor(data) {
        this.name = data.restaurantName
        this.adress = data.adress
        this.position = {
            lat: data.lat,
            lng: data.long
        }
        this.average = getAverageFromRating()
        this.element = document.getElementById(data.id)
        this.marker = new Google.map.marker
    }
    getAverageFromRating() {
        let score = 0
        this.ratings.forEach((ratings) => {
            score += rating.stars
        })
        let average = score / this.ratings.length
    }
    getElement() {
        this.element.addEventListener("click", () => {

        })
    }
    creatRestaurantView() {
        var viewRestaurant = document.createElement("div");
        viewRestaurant.setAttribute('class', 'restaurant');
        viewRestaurant.innerHTML = `<div> + this.printRatings < /div>`
           
    }
    printRatings(){
        
        let string =""
    this.ratings.forEach((rating) => {
        spring += ` < div class = "col-md-12 ratingsStars text-bold" > $ {this.stars} < /div> <div class = "col-md-12 ratingsComment" > $ {this.comment} < /div>`
    })
    return string
    }
}
