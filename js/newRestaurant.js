/**
 * @constructor
 * @return {object} L' objet liste des nouveaux restaurants
 */

class NewRestaurant {
    constructor(element, onSubmit) {
        this.element        = element
        this.onSubmit       = onSubmit
        this.hide()             
    }
/*cache l'element*/
    hide(){
        this.element.style.display='none'
    }
/*montre l'element*/
    show() {
        this.element.style.display = 'block'
    }
/*Formulaire d'ajout d'un restaurant*/

    addNewRestaurant(address, latLng) {
        let element = document.createElement("div")
        element.setAttribute('class', 'col-md-12')
        let form = document.createElement('form')
        form.innerHTML = `      <fieldset>
                                <legend>Donner une note à votre restaurant :</legend>
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
                                <h4>Laisser un commentaire sur votre restaurant :</h4>
                            </div>
                            <textarea name="textarea" rows="10" cols="50" class="col-md-12">
                                    Vous pouvez écrire ici votre commentaire sur le restaurant.
                            </textarea> 
                            <div class="nameRestaurant">
                                <label for="name">Saisir le nom de votre restaurant :</label>
                                <input type="text" id="name" name="name" required minlength="4" maxlength="50" size="100">
                            </div>
                            <div class="addressRestaurant">
                                <label for="name">Saisir l'adresse de votre restaurant :</label>
                                <input type="text" id="address" name="address" required minlength="4" maxlength="100" size="100" value="${address}">
                            </div>
                            <button class="btn-action add">Valider</button>
                          `
        element.appendChild(form)
        $(element).find('button').on('click', event => {
            /* closest : permet de retrouver le parent le plus proche*/
            event.preventDefault()

            let form$           = $(form)
            let stars           = Number((form$).find('input:checked').val())/*donne ma note*/
            let comment         = (form$).find('textarea').val().trim()/*donne le commentaire*/
            let restaurantName  = (form$).find('#name').val().trim()
            let address         = (form$).find('#address').val().trim()
            let ratings         = [{ stars, comment }]

            let addResto = new Restaurant({ restaurantName, ratings, address, lat:latLng.lat(), long:latLng.lng()})
            if (typeof (this.onSubmit) === 'function'){
                this.onSubmit(addResto)
                this.hide()
            }
        })
        $(this.element).html(element) 
        this.show( )
        return element
    }
}