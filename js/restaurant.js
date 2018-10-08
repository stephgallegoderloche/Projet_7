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
 * @param {object} (commentsJson) Indique si le restaurant est à prendre dans la base JSON ou dans l'API
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
        const viewRestaurant = document.createElement("div");

        viewRestaurant.setAttribute('class', 'restaurant row');
        viewRestaurant.innerHTML = `<div class="col-md-8"> 
                                        <div class="row">
                                            <div class="col-md-12">
                                                ${this.name}
                                            </div>
                                            <div class="col-md-12">
                                                ${this.starsAverageRestaurant(this.average)}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4"> ${this.img}</div> `

        let detail = this.creatRestaurantDetail()
        
        viewRestaurant.appendChild(detail)
        viewRestaurant.addEventListener("click", _ => {
            detail.style.display = (detail.style.display == 'block')? 'none' : 'block'
         })
       return viewRestaurant
    }
    creatRestaurantDetail(){
        let detail = document.createElement("div")
        detail.innerHTML = `<div class="col-md-12">
                                                ${this.adress}
                                            </div>`
        detail.style.display = 'none'
        return(detail)
    }
    printRatings(){  
        let string =""

        this.ratings.forEach((rating) => {
            spring += `<div class="col-md-12 ratingsStars text-bold"> ${this.starsAverageRestaurant(this.average)} </div> <div class="col-md-12 ratingsComment"> ${this.comment} </div>`
        })
    return string
    }
    starsAverageRestaurant(note) {
        return [1,2,3,4,5].map(i =>{
            debugger
            if ( i <= note ){
               return `<img src="img/starOk.png" alt="logo_onResTôt" class="img-responsive"> `
            }else{
                if ( note <= i -0.5 ){
                   return `<img src="img/starMid.png" alt="logo_onResTôt" class="img-responsive"> `
                }else{
                   return `<img src="img/star.png" alt="logo_onResTôt" class="img-responsive"> `
                }
            }
        }).join("")
    }
}

/*
# TO DO !!!!!
Utiliser streetView pour récupérer l'image:
    - inclure dans le construc du restaurant

Afficher les restaurants:
    Nom du restaurant
    MoyenneEtoile              Image

    au click sur le nom du restaurant :
        - lancer une function qui affiche les commentaires

        étoile                  Texte

        Ajout d'un bouton "Ajouter un avis":
            function ouvrir un formulaire

*/
