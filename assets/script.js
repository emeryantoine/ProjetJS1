function updateBannerPadding() {
    // Get width and height of the window excluding scrollbars
    var w = document.documentElement.clientWidth;

    // Display result inside a div element
    if (w >= 415) {
        document.getElementById("banner").style.padding = "74px 0px 0px 0px";
        return;
    }
    if (w >= 359) {
        document.getElementById("banner").style.padding = "114px 0px 0px 0px";
        return;
    }
    if (w >= 355) {
        document.getElementById("banner").style.padding = "134px 0px 0px 0px";
        return;
    } else {
        document.getElementById("banner").style.padding = "174px 0px 0px 0px";
        return;
    }
}

function updateBannertext() {
    var w = document.documentElement.clientWidth;

    if (w < 553) {
        document.getElementById("bannerCatchPhrase").style.display = "none";
        document.getElementById("bannerBrandName").style.bottom = "0px";
    } else {
        document.getElementById("bannerCatchPhrase").style.display = "block";
        document.getElementById("bannerBrandName").style.bottom = "20px";
    }
    return
}

// Attaching the event listener function to window's resize event
window.addEventListener("resize", () => {
    updateBannerPadding();
    updateBannertext();
}, false);

// Calling the function for the first time
updateBannertext();
updateBannerPadding();

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
        //console.log(ligne.qteArticle);

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
    return false;
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
        //console.log(ligne.qteArticle);

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

function manageEvent() {
    const events = document.querySelectorAll(".input-panier");
    events.forEach(function (inputupdate) {
        inputupdate.addEventListener('change', function () {
            let qte = document.getElementById(this.id).value;
            let price = document.getElementById(String(this.id).replace("-inputId", "-itemPrice")).textContent;

            // document.getElementById(String(this.id).replace("-inputId", "-sousTT")).textContent = String(qte * price);
            let target = "#" + String(this.id).replace("-inputId", "-sousTT")
            document.querySelector(target).textContent = String((qte * price * 100) / 100);


            const ssTT = $("p[id*='sousTT']");
            let total = 0.;
            for (let i = 0; i < ssTT.length; i++) {
                total += parseFloat(ssTT[i].textContent) * 100;
            }
            document.getElementById("prixTotal").textContent = total / 100;
        })
    })
}


// Bouton retour en haut 

document.addEventListener('DOMContentLoaded', function () {
    window.onscroll = function (ev) {
        document.getElementById("cRetour").className = (window.pageYOffset > 100) ? "cVisible" : "cInvisible";
    };
});

//fonction show more

function showmore(myself) {
    document.getElementById(myself.id + "-div").removeAttribute("hidden");
}

//Faire une commande custom

const customUpdate = document.getElementById('texture-select');
const customUpdate2 = document.getElementById('update-input');

customUpdate.addEventListener('change', customizer);
customUpdate2.addEventListener('change', customizer);

function customizer(){
    let src = document.getElementById('texture-select').value;
    let text = document.getElementById('update-input').value;
    let price = 0.;

    console.log(price)

    if(src.includes('paper'))
        price = 5;
    if(src.includes('wood'))
        price = 10;
    if(src.includes('alu'))
        price = 20;
    if(src.includes('gold'))
        price = 50;
    if(src.includes('cloud'))
        price = 200;
    
    if(price == 0)
        price = "--.--";
    else
        price += text.length * 2 + .98;

    if(text == "")
        text = "Votre Texte ici!!";

    document.getElementById('customImg').src = src;
    document.getElementById('customText').textContent = text;
    document.getElementById('customPrice').innerHTML = (price * 100) / 100;
}