/* si même article, ajouter + 1 et non nouvelle ligne
supprimer les différents articles ligne par ligne
ajouter bouton +/-
sélectionner en général les items et non en passant par les ID
 */
function LignePanier(code, qte, prix) {
    this.codeArticle = code;
    this.qteArticle = qte;
    this.prixArticle = prix;
    this.ajouterQte = function (qte) {
        this.qteArticle += qte;
    }
    this.getPrixLigne = function () {
        let resultat = (this.prixArticle * this.qteArticle * 100) / 100;
        return resultat;
    }
    this.getCode = function () {
        return this.codeArticle;
    }
}

function Panier() {
    this.liste = [];
    this.ajouterArticle = function (code, qte, prix) {
        let index = this.getArticle(code);
        if (index == -1) this.liste.push(new LignePanier(code, qte, prix));
        else this.liste[index].ajouterQte(qte);
    }
    this.getPrixPanier = function () {
        let total = 0;
        for (let i = 0; i < this.liste.length; i++)
            total += (this.liste[i].getPrixLigne()) * 100;
        return total / 100;
    }
    this.getArticle = function (code) {
        for (let i = 0; i < this.liste.length; i++)
            if (code == this.liste[i].getCode()) return i;
        return -1;
    }
    this.supprimerArticle = function (code) {
        let index = this.getArticle(code);
        if (index > -1) this.liste.splice(index, 1);
    }
}


// Récupérer les informations au clic


function ajouter(btnIci) {

    let code = document.getElementById(btnIci.id + "-nameItem").textContent;
    let qte = parseFloat(document.getElementById(btnIci.id + "-qte").textContent);
    let prix = parseFloat(document.getElementById(btnIci.id + "-price").textContent);
    let monPanier = new Panier();
    monPanier.ajouterArticle(code, qte, prix);
    let tableau = document.getElementById("tableau");
    let longueurTab = parseInt(document.getElementById("nbreLignes").innerHTML);
    if (longueurTab > 0) {
        for (let i = longueurTab; i > 0; i--) {
            let qteAfterTransform = tableau.rows[i].cells[1].innerHTML;
            qteAfterTransform = String(qteAfterTransform).substr(44, 1);
            monPanier.ajouterArticle((tableau.rows[i].cells[0].innerHTML), parseFloat(qteAfterTransform), parseFloat(tableau.rows[i].cells[2].textContent));
            tableau.deleteRow(i);
        }
    }
    let longueur = monPanier.liste.length;
    for (let i = 0; i < longueur; i++) {
        let ligne = monPanier.liste[i];
        let ligneTableau = tableau.insertRow(-1);
        let colonne1 = ligneTableau.insertCell(0);
        colonne1.innerHTML += ligne.getCode();
        let colonne2 = ligneTableau.insertCell(1);
        /*colonne2.innerHTML += ligne.qteArticle;*/
        colonne2.innerHTML += "<input type=\"number\" min=\"1\" max=\"9\" value=\"" + ligne.qteArticle + "\" class=\"input-panier\" id=\"" + ligne.getCode() + "-inputId\"></input>"
        let colonne3 = ligneTableau.insertCell(2);
        // colonne3.innerHTML += ligne.prixArticle;
        colonne3.innerHTML += "<p id=\"" + ligne.getCode() + "-itemPrice\">" + ligne.prixArticle + "</p>"
        let colonne4 = ligneTableau.insertCell(3);
        /*colonne4.innerHTML += ligne.getPrixLigne();*/
        colonne4.innerHTML += "<p id=\"" + ligne.getCode() + "-sousTT\">" + ligne.getPrixLigne() + "</p>"
        let colonne5 = ligneTableau.insertCell(4);
        colonne5.innerHTML += "<button class=\"btn btn-dark\" type=\"submit\" onclick=\"supprimer(this.parentNode.parentNode.cells[0].innerHTML)\"><span class=\"glyphicon glyphicon-remove\"></span> Retirer</button>";
    }
    document.getElementById("prixTotal").innerHTML = monPanier.getPrixPanier() + " €";
    document.getElementById("nbreLignes").innerHTML = longueur;

    manageEvent();
}

// Supprimer une ligne complête

function supprimer(code) {
    let monPanier = new Panier();
    let tableau = document.getElementById("tableau");
    let longueurTab = parseInt(document.getElementById("nbreLignes").innerHTML);
    if (longueurTab > 0) {
        for (let i = longueurTab; i > 0; i--) {
            let qteAfterTransform = tableau.rows[i].cells[1].innerHTML;
            qteAfterTransform = String(qteAfterTransform).substr(44, 1);
            monPanier.ajouterArticle((tableau.rows[i].cells[0].innerHTML), parseFloat(qteAfterTransform), parseFloat(tableau.rows[i].cells[2].textContent));
            tableau.deleteRow(i);
        }
    }
    monPanier.supprimerArticle(code);
    let longueur = monPanier.liste.length;
    for (let i = 0; i < longueur; i++) {
        let ligne = monPanier.liste[i];
        let ligneTableau = tableau.insertRow(-1);
        let colonne1 = ligneTableau.insertCell(0);
        colonne1.innerHTML += ligne.getCode();
        let colonne2 = ligneTableau.insertCell(1);
        /*colonne2.innerHTML += ligne.qteArticle;*/
        colonne2.innerHTML += "<input type=\"number\" min=\"1\" max=\"9\" value=\"" + ligne.qteArticle + "\" class=\"input-panier\" id=\"" + ligne.getCode() + "-inputId\"></input>"
        let colonne3 = ligneTableau.insertCell(2);
        // colonne3.innerHTML += ligne.prixArticle;
        colonne3.innerHTML += "<p id=\"" + ligne.getCode() + "-itemPrice\">" + ligne.prixArticle + "</p>"
        let colonne4 = ligneTableau.insertCell(3);
        /*colonne4.innerHTML += ligne.getPrixLigne();*/
        colonne4.innerHTML += "<p id=\"" + ligne.getCode() + "-sousTT\">" + ligne.getPrixLigne() + "</p>"
        let colonne5 = ligneTableau.insertCell(4);
        colonne5.innerHTML += "<button class=\"btn btn-primary\" type=\"submit\" onclick=\"supprimer(this.parentNode.parentNode.cells[0].innerHTML)\"><span class=\"glyphicon glyphicon-remove\"></span> Retirer</button>";
    }
    document.getElementById("prixTotal").innerHTML = monPanier.getPrixPanier();
    document.getElementById("nbreLignes").innerHTML = longueur;

    manageEvent();
}

// Modifier la quantité d'articles dans le panier

function manageEvent(){
    const events = document.querySelectorAll(".input-panier");
    events.forEach(function (inputupdate) {
        inputupdate.addEventListener('change', function(){
            let qte = document.getElementById(this.id).value;
            let price = document.getElementById(String(this.id).replace("-inputId", "-itemPrice")).textContent;

            // document.getElementById(String(this.id).replace("-inputId", "-sousTT")).textContent = String(qte * price);
            let target = "#" + String(this.id).replace("-inputId", "-sousTT")
            document.querySelector(target).textContent = String((qte*price * 100 ) / 100);
            

            const ssTT = $("p[id*='sousTT']");
            let total = 0.;
            for (let i = 0; i < ssTT.length; i++) {
                total += parseFloat(ssTT[i].textContent) * 100;
            }
            document.getElementById("prixTotal").textContent = total / 100;

        })
    })
}