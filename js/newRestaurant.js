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
        form.innerHTML = `      
                            <legend>Ajouter votre restaurant :</legend>
                            <div class="nameRestaurant">
                                <label for="name">Saisir le nom de votre restaurant :</label>
                                <input type="text" id="name" name="name" required minlength="4" maxlength="150" size="50">
                            </div>
                            <div class="addressRestaurant">
                                <label for="name">Saisir l'adresse de votre restaurant :</label>
                                <input type="text" id="address" name="address" required minlength="4" maxlength="400" size="50" value="${address}">
                            </div>                            
                            <div class="col-md-12">
                                <div class="row buttons">
                                    <div class="col-md-6">
                                        <button class="btn-action add center-block" id="submit">Valider</button>
                                    </div>
                                    <div class="col-md-6">
                                        <button class="btn-action add center-block" id="cancel">annuler</button>
                                    </div>
                                </div>
                            </div>
                            
                            
                          `
        element.appendChild(form)
        $(element).find('#submit').on('click', event => {
            /* closest : permet de retrouver le parent le plus proche*/
            event.preventDefault()

            let form$           = $(form)
           
            let restaurantName  = (form$).find('#name').val().trim()
            let address         = (form$).find('#address').val().trim()
            

            let addResto = new Restaurant({ restaurantName, address, lat:latLng.lat(), long:latLng.lng()})
            if (typeof (this.onSubmit) === 'function'){
                this.onSubmit(addResto)
                this.hide()
            }
        })
        $(element).find('#cancel').on('click', event => {
            /* closest : permet de retrouver le parent le plus proche*/
            event.preventDefault()
            let form$ = $('#cancel').closest('form')
            $('form').innerHTML = ''
            form$.remove()
        })
        $(this.element).html(element) 
        this.show( )
        return element
    }
}