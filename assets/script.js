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
        let resultat = (this.prixArticle * this.qteArticle) * 100;
        return resultat / 100;
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
            monPanier.ajouterArticle((tableau.rows[i].cells[0].innerHTML), parseFloat(tableau.rows[i].cells[1].innerHTML), parseFloat(tableau.rows[i].cells[2].innerHTML));
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
        colonne2.innerHTML += ligne.qteArticle;
        /*         colonne2.innerHTML += "<input class=\"btn btn-light\" type=\"number\" min=\"0\" min=\"10\" value=\"" + ligne.qteArticle + "\" ></input>";
         */
        // colonne2.innerHTML += "<input value=\"" + qte + "\"></input>";

        let colonne3 = ligneTableau.insertCell(2);
        colonne3.innerHTML += ligne.prixArticle;
        let colonne4 = ligneTableau.insertCell(3);
        colonne4.innerHTML += ligne.getPrixLigne();
        let colonne5 = ligneTableau.insertCell(4);
        colonne5.innerHTML += "<button class=\"btn btn-dark\" type=\"submit\" onclick=\"supprimer(this.parentNode.parentNode.cells[0].innerHTML)\"><span class=\"glyphicon glyphicon-remove\"></span> Retirer</button>";
    }
    document.getElementById("prixTotal").innerHTML = monPanier.getPrixPanier() + " €";
    document.getElementById("nbreLignes").innerHTML = longueur;

}



// Supprimer une ligne complête

function supprimer(code) {
    let monPanier = new Panier();
    let tableau = document.getElementById("tableau");
    let longueurTab = parseInt(document.getElementById("nbreLignes").innerHTML);
    if (longueurTab > 0) {
        for (let i = longueurTab; i > 0; i--) {
            monPanier.ajouterArticle(tableau.rows[i].cells[0].innerHTML, parseFloat(tableau.rows[i].cells[1].innerHTML), parseFloat(tableau.rows[i].cells[2].innerHTML));
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
        colonne2.innerHTML += ligne.qteArticle;
        let colonne3 = ligneTableau.insertCell(2);
        colonne3.innerHTML += ligne.prixArticle;
        let colonne4 = ligneTableau.insertCell(3);
        colonne4.innerHTML += ligne.getPrixLigne();
        let colonne5 = ligneTableau.insertCell(4);
        colonne5.innerHTML += "<button class=\"btn btn-primary\" type=\"submit\" onclick=\"supprimer(this.parentNode.parentNode.cells[0].innerHTML)\"><span class=\"glyphicon glyphicon-remove\"></span> Retirer</button>";
    }
    document.getElementById("prixTotal").innerHTML = monPanier.getPrixPanier();
    document.getElementById("nbreLignes").innerHTML = longueur;
}

// Modifier la quantité d'articles dans le panier

