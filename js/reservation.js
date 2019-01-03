// Objet 

var reservation = {
	duree : '', // durée globale en secondes
	dureeMinutes : '', // affichera les minuetes
	dureeSecondes : '', // affichera les secondes
	decompteId :'', // initialise le decompte

// Ouvre le panneau de réservation qui affiche les infos
	openPanelReservation : function() {
			var that = this;
			// masque ou affiche les différents éléments
			$('#infos-reservation').show();
			$('#infos-station').hide();
			$('#searchStation').hide();
			$('#btn-reserv').hide();
			if(localStorage.getItem("nom")!= "undefined")
			document.getElementById("nom").value=localStorage.getItem("nom");
			if(localStorage.getItem("prenom")!= "undefined")
			document.getElementById("prenom").value=localStorage.getItem("prenom");

			// insére les données de la station choisie
			infosReservation.setInfos();
			// initialise le canvas
			canvas.init();

			// Evenement pour le bouton close
			$('#close-reservation-panel').on('click', function() {
				that.closePanelReservation();
			});

			// Evenement pour le bouton valider
			$('#valide').on('click', this.verifValide);
	},

// Ferme le panneau de réservation et affiche les éléments
	closePanelReservation : function() {
			$('#infos-reservation').hide();
			$('#infos-station').show();
			$('#searchStation').show();
			$('#btn-reserv').show();
			// Vérification de l'exitence d'un canvas
			if (canvas.context != undefined) {
				canvas.clear();
			}
	},



	
// Données contenues dans sessionStorage
	webStorage : function() {
		sessionStorage.statusReservation = true;
		sessionStorage.nomStationReserver = currentStation.nom;
		sessionStorage.dureeReservation = reservationValidity * 60;
		var nom = document.getElementById("nom").value;
		var prenom = document.getElementById("prenom").value;
		console.log(nom, prenom);
		 // On enregistre les nom et prénom de l'utilisateur en local
		  localStorage.setItem("nom", nom);   
		  localStorage.setItem("prenom", prenom);
	},

// Affiche les différentes durée de la réservation
	setTimer : function (init){
		if (init = true) {
			this.duree = Number(sessionStorage.dureeReservation);
		}
		this.dureeMinutes = Math.floor(this.duree / 60);
		this.dureeSecondes = this.duree - this.dureeMinutes * 60;
	},

	verifValide: function() {
		if (canvas.cursorX === '') {
			$('#msgAlerte').text('Merci de signer votre réservation');// Message en cas de canvas vide
		} 
		else {
			// Si on tente de reserver à nouveau sur la station deja reservÃ©e
			if (currentStation.nom === sessionStorage.nomStationReserver) {
				alert('Une réservation est déjà  en cours sur la station ' + sessionStorage.nomStationReserver);
				return reservation.closePanelReservation();
			}

		// Si il y a deja une reservation en cours	
			if (sessionStorage.statusReservation === 'true') {
				
					var confirmation = window.confirm('Souhaitez-vous annuler la réservation en cours à  ' + sessionStorage.nomStationReserver + ' ?');
					if (confirmation) {
						//this.cancelReservation();
						clearInterval(reservation.decompteId);
						sessionStorage.clear();
						reservation.createReservation();
					} else {
						reservation.closePanelReservation();
					}
				
			}
			else {
				reservation.createReservation();
			}
		}
		$('#valide').off('click', this.verifValide);
	},

// Crée la réservation et lance le décompte
	createReservation : function() {
		currentStation.dispo--;
		this.webStorage();
		this.setTimer(true);
		this.decompteReservation();
		this.closePanelReservation();
	},

// Annule une réservation
	cancelReservation : function() {
		clearInterval(this.decompteId);
		infosCurrentReservation.setCurrentInfos(false);
		if (currentStation.dispo != undefined) {
			currentStation.dispo++ ;
			currentStation.setStatus();
		}
	},

// Décompte toutes les 1000 millisecondes
	decompteReservation : function() {
		if (this.duree > 0) {
			var that = this;
			this.decompteId = setInterval(function() {
				if (that.duree <= 0) {
					that.cancelReservation();
					sessionStorage.clear();
				} else {
					that.duree--;					
					sessionStorage.dureeReservation = that.duree;
					that.setTimer(false);
					infosCurrentReservation.setCurrentInfos(true);
					currentStation.setStatus();
				}
			}, 1000);
		}
	},

// Verification du rechargement de la page 
	refreshReservation: function() {
		window.addEventListener('load', function () {
			var that = this;
			if (sessionStorage.statusReservation === 'true') {
				clearInterval(that.decompteId);
				reservation.duree = Number(sessionStorage.dureeReservation);
				reservation.decompteReservation();
			}
		});
	}	
};