/**
 * 
 * @constructor
 * @return { object}              L ' objet restaurant
 */
class Restaurant {
    constructor(data) {
        this.name               = data.restaurantName
        this.address            = data.address
        this.ratings            = data.ratings || []
        this.position           = {
                                    lat: data.lat,
                                    lng: data.long
                                  }
        this.viewComments       = false
        this.average            = this.getAverageFromRating()
        this.restaurantView     = document.createElement("div");

        this.creatRestaurantView();
    
    }

/*Renvoi le nom du restaurant et sa moyenne*/
    getLabel() {
        return `${this.name} ${this.average}`;
    }
/*Calcul la note moyenne du restaurant*/ 
    getAverageFromRating() {
        let score = 0
        this.ratings.forEach((ratings) => {
            score += ratings.stars
        })         
        return !score ? 0 : (score / this.ratings.length)
    }
/*Créer restaurant / Click sur le nom du restaurant*/
    creatRestaurantView(onClick) {

        this.restaurantView.setAttribute('class', 'restaurant row');
        this.restaurantView.innerHTML = `<div class="col-md-8"> 
                                        <div class="row">
                                            <div class="col-md-6 title ">
                                                <h4> ${this.name} </h4>
                                            </div>
                                            <div class="col-md-6 allStars" >
                                                ${this.starsAverageRestaurant(this.average)}
                                            </div>
                                            <div class="col-md-12 address">
                                                ${this.address}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4 imgStreetView"><img src="https://maps.googleapis.com/maps/api/streetview?location=${this.position.lat},${this.position.lng}&size=200x70&key=AIzaSyCocP7YWpIQdHhF4gmlErpa5fxwEO8T5Fw" alt="image du restaurant"></div> `

        let detail = this.creatRestaurantDetail()
        this.restaurantView.appendChild(detail)
    /*Action au Click sur le nom du restaurant*/
        $(this.restaurantView).find('.title').on("click", _ =>{
            if (typeof (onClick) === 'function') {
                onClick(this)
            }
        })
       return this.restaurantView
    }
/*Afficher/cacher les commentaires*/
    viewDetailsComments() {
        let detail$ = $(this.restaurantView).find('.detail')
        this.viewComments = !detail$.is(':visible')
        detail$.toggle(this.viewComments)
        
    }
/*Cacher les commentaires*/
    closeDetailComment(){
        let detail$ = $(this.restaurantView).find('.detail')
        this.viewComments =false
        detail$.hide()
    }
/*Afficher/cacher les images*/
    viewImg() {
        let img$ = $(this.restaurantView).find('.imgStreetView')
        this.imgview = !img$.is(':visible')
        img$.toggle(this.imgview)

    }
/*Cacher les images*/
    closeImg() {
        let img$ = $(this.restaurantView).find('.imgStreetView')
        this.viewComments = false
        img$.hide()
    }
/*Bouton ajouter un commentaire*/
    createButton(){
        let container = document.createElement('div')
        container.setAttribute('class', 'col-md-12')
        let button = document.createElement("button")
        button.setAttribute('class','btn-action add center-block') 
        button.innerHTML = `Ajouter un commentaire`
        button.addEventListener('click', event => {
            event.preventDefault()
            event.stopPropagation()
            
            let detail$ = $(event.target).closest('.detail')
            if (!detail$.find('form').length){
                let form = this.createFormulaire()
                detail$.append(form) 
            }
        })
        container.appendChild(button)
        return container
    }

/*Rafraichir les commentaires et la moyenne du restaurant*/
    reloadComments(){
        $(this.restaurantView).find('.commentsItems').html(this.printRatings())
        $(this.restaurantView).find('.allStars').html(this.starsAverageRestaurant(this.average))
    }

/*Création du formulaire d'ajout d'un commentaires*/
    createFormulaire(){
        let element = document.createElement("div")
        element.setAttribute('class', 'col-md-12 formulaire') 
        let form = document.createElement('form')
        form.innerHTML = `  <fieldset>
                                <legend>Donner une note au restaurant :</legend>
                                <div class="note">
                                    <input type="radio" 
                                        name="stars" value="1" checked />
                                    <label class="radio-label"> 1</label>
                                </div>
                                <div class="note">
                                    <input type="radio"
                                        name="stars" value="2" />
                                    <label class="radio-label"> 2</label>
                                </div>
                                <div class="note">
                                    <input type="radio"
                                        name="stars" value="3" />
                                    <label class="radio-label"> 3</label>
                                </div>
                                <div class="note">
                                    <input type="radio"
                                        name="stars" value="4" />
                                    <label class="radio-label"> 4</label>
                                </div>
                                <div class="note">
                                    <input type="radio"
                                        name="stars" value="5" />
                                    <label class="radio-label"> 5</label>
                                </div>
                            </fieldset>
                            <div class="title">
                                <h4>Laisser un commentaire sur le restaurant :</h4>
                            </div>
                            <textarea name="textarea" rows="10" cols="50" class="col-md-12">
                                    Vous pouvez écrire ici votre commentaire sur le restaurant.
                            </textarea> 
                          `
        element.appendChild(form)
        let container = document.createElement('div')
        container.setAttribute('class', 'col-md-12') 
        let btn = document.createElement('div')
        btn.setAttribute('class', 'row buttons')
       
        container.appendChild(btn)
        btn.appendChild(this.createAddComments())
        btn.appendChild(this.cancelForm())
        form.appendChild(container)
        return element
    }
 /*Bouton qui valide le formulaire ajouter un commentaire*/
    createAddComments() {
        let container = document.createElement('div')
        container.setAttribute('class', 'col-md-6')
        let button = document.createElement('button')
        button.setAttribute('class', 'btn-action add center-block')
        button.innerHTML = `Valider`
        button.addEventListener('click', event => {
            /* closest : permet de retrouver le parent le plus proche*/
            event.preventDefault()
            event.stopPropagation()
            let form$ = $(button).closest('form')
            let stars = Number((form$).find('input:checked').val())/*donne ma note*/
            let comment = (form$).find('textarea').val().trim()/*donne le commentaire*/

            this.ratings.push({ stars, comment })
            this.average = this.getAverageFromRating()
            this.reloadComments()
            form$.remove()
            this.viewImg()
            
        })
        container.appendChild(button)
        return container
    }
/*Bouton qui annule le formulaire ajouter un commentaire*/
    cancelForm() {
        let container = document.createElement('div')
        container.setAttribute('class', 'col-md-6')
        let button = document.createElement("button")
        button.setAttribute('class', 'btn-action add center-block')
        button.innerHTML = `Annuler`
        button.addEventListener('click', event => {
            /* closest : permet de retrouver le parent le plus proche*/
            event.preventDefault()
            let form$ = $(button).closest('form')
           $('form').innerHTML = ''
            form$.remove()
        })
        container.appendChild(button)
        return container
    }
/*Afficher l'élément contenant les commentaires*/
    creatRestaurantDetail(){
        let detail = document.createElement("div")
        detail.setAttribute('class', 'row detail')
        detail.innerHTML = `<div class="col-md-12 comments">
                                <h4> Commentaires :</h4>
                                <div class="commentsItems">
                                    ${this.printRatings()}
                                </div>
                            </div>
                            `
        let button = this.createButton()
        detail.appendChild(button)
        detail.style.display = (this.viewComments) ? 'block' : 'none'
        return(detail)
    }
/*Afficher les commentaires*/
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
/*Afficher les étoiles*/
    starsAverageRestaurant(note) {
        return [1,2,3,4,5].map(i =>{
            
            if ( i <= note ){
               return `<img src="img/starOk.png" alt="logo_onResTôt" class="stars"> `
            }else{
                if ( note >= i - 0.5 ){
                   return `<img src="img/starMid.png" alt="logo_onResTôt" class="stars"> `
                }else{
                   return `<img src="img/star.png" alt="logo_onResTôt" class="stars"> `
                }
            }
        }).join("")
    }
}