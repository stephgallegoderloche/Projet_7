/**
 * Nos restaurants
 * @constructor
 * @return { object}            L ' objet restaurant
 * 
 * @param {object} (position)     La latitude et longitude du restaurant
 * @param {string} (name)         Le nom du restaurant
 * @param {string} (adress)       L' adresse du restaurant
 * @param {number} (average)      La note moyenne du restaurant
 */
class Restaurant {
    constructor(data) {
        this.name               = data.restaurantName
        this.address             = data.address
        this.ratings            = data.ratings
        this.position           = {
                                    lat: data.lat,
                                    lng: data.long
                                  }
        this.viewComments       = false
        this.average            = this.getAverageFromRating()
        this.restaurantView     = document.createElement("div");

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
    
    creatRestaurantView() {

        this.restaurantView.setAttribute('class', 'restaurant row');
        this.restaurantView.innerHTML = `<div class="col-md-8"> 
                                        <div class="row">
                                            <div class="col-md-6 title ">
                                                <h2> ${this.name} </h2>
                                            </div>
                                            <div class="col-md-6 allStars" >
                                                ${this.starsAverageRestaurant(this.average)}
                                            </div>
                                            <div class="col-md-12 address">
                                                ${this.address}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4"> ${this.img}</div> `

        let detail = this.creatRestaurantDetail()
        
        this.restaurantView.appendChild(detail)
        $(this.restaurantView).find('h2').on("click", _ => {
            this.viewComments = (detail.style.display != 'block')
            detail.style.display = ( !this.viewComments) ? 'none' : 'block'
         })
       return this.restaurantView
    }

    createButton(){
        
        let button = document.createElement("button")
        button.setAttribute('class','btn-action add') 
        button.innerHTML=`Ajouter un commentaire`
        button.addEventListener('click', event => {
            event.preventDefault()
            event.stopPropagation()
            
            let detail$ = $(event.target).closest('.detail')
            if (!detail$.find('form').length){
                let form = this.createFormulaire()
                detail$.append(form) 
            }
        })
        return button
    }
    createAddComments() {
        let button = document.createElement("button")
        button.setAttribute('class', 'btn-action add')
        button.innerHTML = `Valider`
        button.addEventListener('click', event => {
            /* closest : permet de retrouver le parent le plus proche*/ 
            event.preventDefault()
            let form$ = $(button).closest('form')
            let stars = Number((form$).find('input:checked').val())/*donne ma note*/
            let comment = (form$).find('textarea').val().trim()/*donne le commentaire*/
            
            this.ratings.push({stars,comment})
           
            this.average = this.getAverageFromRating() 
            console.log(this)
            
            this.creatRestaurantView()
            form$.remove()           
        })
        
        return button
    }
    reloadComment(element){
        $(element).html(this.printRatings())
        
    }
    reloadAverage(note){

        let element = $('.allStars')
        console.log(element)
    }
    createFormulaire(){
        let element = document.createElement("div")
        element.setAttribute('class', 'row formulaire') 
        let form = document.createElement('form')
        form.setAttribute('class','col-md-12')

        form.innerHTML = `  <fieldset>
                                <legend>Formulaire :</legend>

                                <div>
                                    <input type="radio" 
                                        name="drone" value="1" checked />
                                    <label for="huey">Huey</label>
                                </div>

                                <div>
                                    <input type="radio"
                                        name="drone" value="2" />
                                    <label for="dewey">Dewey</label>
                                </div>

                                <div>
                                    <input type="radio"
                                        name="drone" value="3" />
                                    <label for="louie">3 etoile</label>
                                </div>
                                <div>
                                    <input type="radio"
                                        name="drone" value="4" />
                                    <label for="louie">3 etoile</label>
                                </div>
                                <div>
                                    <input type="radio"
                                        name="drone" value="5" />
                                    <label for="louie">3 etoile</label>
                                </div>

                            </fieldset>
                            <textarea name="textarea" rows="10" cols="50">
                                    Vous pouvez écrire quelque
                                    chose ici votre commentaire.
                            </textarea> 
                          `
        element.appendChild(form)
        form.appendChild(this.createAddComments())
        return element
    }

    creatRestaurantDetail(){
        let detail = document.createElement("div")
        detail.setAttribute('class', 'row detail')
        detail.innerHTML = `<div class="col-md-12 comments">
                                <h4> Commentaires :</h4>
                                ${this.printRatings()}
                            </div>
                            `
        let button = this.createButton()
        detail.appendChild(button)
        detail.style.display = (this.viewComments) ? 'block' : 'none'
        return(detail)
    }
    
    printRatings(){  
        let string =" "

        this.ratings.forEach((rating) => {
            string += ` <div class="row comment">
                            <div class="col-md-12 ratingsStars"> 
                                ${this.starsAverageRestaurant(rating.stars)} 
                            </div> 
                            <div class="col-md-12 ratingsComment text-bold"> 
                                ${rating.comment} 
                            </div>
                        </div>`
        })
       
    return string
    }
    starsAverageRestaurant(note) {
        return [1,2,3,4,5].map(i =>{
            
            if ( i <= note ){
               return `<img src="img/starOk.png" alt="logo_onResTôt" class="stars"> `
            }else{
                if ( note == i - 0.5 ){
                   return `<img src="img/starMid.png" alt="logo_onResTôt" class="stars"> `
                }else{
                   return `<img src="img/star.png" alt="logo_onResTôt" class="stars"> `
                }
            }
        }).join("")
    }
}