// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
class Ajax{
    ajaxGet(url, callback) {
        var request = new XMLHttpRequest();
        request.open("GET", url);
        request.addEventListener("load", function () {
            if (request.status >= 200 && request.status < 400) {
                // Appelle la fonction callback en lui passant la réponse de la requête
                callback(request.responseText);
            } else {
                console.error(restaurants.status + " " + restaurants.statusText + " " + url);
            }
        });
        restaurants.addEventListener("error", function () {
            console.error("Erreur réseau avec l'URL " + url);
        });
        restaurants.send(null);
    }
}