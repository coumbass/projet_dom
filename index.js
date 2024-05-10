// Déclaration des variables globales
const ajouterLivreBtn = document.getElementById('ajouterLivreBtn');
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close');
const ajouterLivreModalBtn = document.getElementById('ajouterLivreModalBtn');
const listeLivres = document.getElementById('listeLivres');
let livres = [];

// Fonction pour ajouter un livre à la liste
function ajouterLivre(titre, auteur) {
    if(titre && auteur) {
        const livre = {
            id: generateId(),
            titre: titre,
            auteur: auteur,
            lu: false
        };
        livres.push(livre);
        sauvegarderLivres();
        afficherLivres();
        modal.style.display = 'none';
        // Reinitialise les champs du modal
        document.getElementById('titre').value = '';
        document.getElementById('auteur').value = '';
    } else {
        alert('Veuillez remplir tous les champs.');
    }
}

// Fonction pour supprimer un livre de la liste
function supprimerLivre(id) {
    livres = livres.filter(livre => livre.id !== id);
    sauvegarderLivres();
    afficherLivres();
}

// Fonction pour marquer un livre comme lu
function marquerCommeLu(id) {
    livres.forEach(livre => {
        if(livre.id === id) {
            livre.lu = !livre.lu;
        }
    });
    sauvegarderLivres();
    afficherLivres();
}

// Fonction pour générer un ID unique pour chaque livre ajouté
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

// Fonction pour afficher les livres dans la liste
function afficherLivres() {
    listeLivres.innerHTML = '';
    livres.forEach(livre => {
        const livreItem = document.createElement('div');
        livreItem.classList.add('livre');
        livreItem.innerHTML = `
            <span>ID: ${livre.id}</span>
            <h3>Titre: ${livre.titre}</h3>
            <p>Auteur: ${livre.auteur}</p>
            <button class="luBtn">${livre.lu ? 'Non lu' : 'Lu'}</button>
            <button class="supprimerBtn">Supprimer</button>
        `;
        if(livre.lu) {
            livreItem.classList.add('lu');
        }
        listeLivres.appendChild(livreItem);

        // Ajoute les evenements pour marquer comme lu et supprimer
        const luBtn = livreItem.querySelector('.luBtn');
        luBtn.addEventListener('click', () => marquerCommeLu(livre.id));
        const supprimerBtn = livreItem.querySelector('.supprimerBtn');
        supprimerBtn.addEventListener('click', () => supprimerLivre(livre.id));
    });
}

// Fonction pour sauvegarder les livres dans localStorage
function sauvegarderLivres() {
    localStorage.setItem('livres', JSON.stringify(livres));
}


document.addEventListener('DOMContentLoaded', () => {
    // Vérifie si des livres sont deja stockés dans localStorage au chargement de la page
    if(localStorage.getItem('livres')) {
        livres = JSON.parse(localStorage.getItem('livres'));
        afficherLivres();
    }

    // Ouvre le modal pour ajouter un livre
    ajouterLivreBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Ferme le modal lorsqu'on clique sur la croix
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Ajoute un livre à la liste lorsqu'on clique sur le bouton "Ajouter"
    ajouterLivreModalBtn.addEventListener('click', () => {
        const titre = document.getElementById('titre').value;
        const auteur = document.getElementById('auteur').value;
        ajouterLivre(titre, auteur);
    });
});
