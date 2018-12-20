// Tableau contenant les donnees du diapo
var slides = [
    {
        url: "range-velo.jpg",
        title: "Bienvenue sur Velo'V",
        text: "Reserver un velo n'a jamais ete aussi facile !"
    },
    {
        url: "site-00.jpg",
        title: "Comment ca marche ?",
        text: "Pour utiliser l'appli Velo'V, il suffit de suivre les differentes etapes."
    },
    {
        url: "site-01.jpg",
        title: "1. Choisir votre station",
        text: "Avec l'appli Velo'V, vous selectionnez votre station a l'aide d'un marqueur sur la map.<br />De plus, la zone de recherche vous permet d'affiner la localisation de la station recherchee."
    },
    {
        url: "site-02.jpg",
        title: "2. Valider la reservation",
        text: 'Une fois la station choisie, il ne reste plus qu\'a  valider la reservation.<br />Pour cela, il suffit de signer la reservation dans la zone prevue a cet effet et d\'appuyer sur "Valider".'
    },
    {
        url: "site-03.jpg",
        title: "3. Reservation en cours",
        text: "Retrouvez toutes les informations concernant votre reservation en cours,<br />ainsi que la possibilité de l'annuler à tout moment."
    }
];

// variables globales

var apiKey = '8131f190c7e707b71e68d917a0b5b868deb7ae7a';
var contrat = 'lyon';
var reservationValidity = 20; // Durée d'une réservation en minute
$('#infos-reservation').hide(); // masque le bloc station choisie

//---------------------------------------------------------------------------------//

// Objet Slider1 instancié de Diaporama
var Slider1 = Object.create(Diaporama);
Slider1.initDiapo('diaporama', slides);
Slider1.eventsDiapo();

//------------------------------------------------------------------------------------//
$('.burger').on('click', function () {
$(this).toggleClass('open');
});

$('.burger').on('touch', function () {
$(this).toggleClass('open');
});


// Appel des differents objets

reservation.refreshReservation();  // Vérification en cas de refresh de la page
stations.recupAllStations();  // Récupération de toutes les stations et appel de la Map
infosCurrentReservation.setCurrentInfos();  // Affichage dans le footer de la réservation en cours