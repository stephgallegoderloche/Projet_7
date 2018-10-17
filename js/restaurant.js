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
        this.adress             = data.address
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
                                            <div class="col-md-12 title ">
                                                <h2> ${this.name} </h2>
                                            </div>
                                            <div class="col-md-12 allStars">
                                                ${this.starsAverageRestaurant(this.average)}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4"> ${this.img}</div> `

        let detail = this.creatRestaurantDetail()
        
        viewRestaurant.appendChild(detail)
        $(viewRestaurant).find('h2').on("click", _ => {
            detail.style.display = (detail.style.display == 'block')? 'none' : 'block'
         })
       return viewRestaurant
    }

    createButton(){
        
        let button = document.createElement("button")
        button.setAttribute('class','btn-action add') 
        button.innerHTML=`Ajouter un commentaire`
        button.addEventListener('click', event => {
            event.preventDefault()
            event.stopPropagation()
            let form = this.createFormulaire()
            $(event.target).closest('.detail').append(form) 
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
            let stars = (form$).find('input:checked').val()/*donne ma note*/
            let comment = (form$).find('textarea').val().trim()/*donne le commentaire*/
            
            this.ratings.push({stars,comment})
            this.reloadComment(form$.closest('.detail').find('.comment'))
            form$.remove()           
        })
        
        return button
    }
    reloadComment(element){
        $(element).html(this.printRatings())
    }

    createFormulaire(){
        let element = document.createElement("div")
        element.setAttribute('class', 'col-md-12 formulaire') 
        let form = document.createElement('form')

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
        form.appendChild(this.createAddComments())
        return form
    }

    creatRestaurantDetail(){
        let detail = document.createElement("div")
        detail.setAttribute('class', 'detail')
        detail.innerHTML = `<div class="col-md-12 comment">
                                ${this.printRatings()}
                            </div>
                            `
        let button = this.createButton()
        detail.appendChild(button)
        detail.style.display = 'none'
        return(detail)
    }
    printRatings(){  
        let string =" "

        this.ratings.forEach((rating) => {
           string += `<div class="col-md-12 ratingsStars"> ${this.starsAverageRestaurant(rating.stars)} </div> <div class="col-md-12 ratingsComment text-bold"> ${rating.comment} </div>`
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
