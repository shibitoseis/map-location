// Objet Diaporama

var Diaporama = {

	initDiapo: function (element, tableaux) {
		this.conteneur = document.getElementById(element);
		this.tableaux = tableaux;
		this.rep = 'images/';
		this.index = 0;
		this.creerElement();
		this.sliderAuto();
	},

	creerElement: function () {
		var divElt = document.createElement('div');
			divElt.classList.add('slide');
			this.conteneur.appendChild(divElt);

		var imgElt = document.createElement('img');
			imgElt.src = this.rep + this.tableaux[this.index].url;
			imgElt.id = "img-slide";
			imgElt.alt = this.tableaux[this.index].url;
			
		var divContenu = document.createElement('div');
			divContenu.classList.add('contenu');

		var titreElt = document.createElement('h2');
			titreElt.id = "titre-slide";
			titreElt.classList.add('infos-slide');
			titreElt.appendChild(document.createTextNode(this.tableaux[this.index].title));

		var pElt = document.createElement('p');
			pElt.id = "text-slide";
			pElt.classList.add('infos-slide');			
			pElt.appendChild(document.createTextNode(this.tableaux[this.index].text));

			divContenu.appendChild(titreElt);
			divContenu.appendChild(pElt);

			divElt.appendChild(imgElt);
			divElt.appendChild(divContenu);

			return divElt;
	},

	afficherDiapo: function () {
		imgElt = document.getElementById('img-slide');
		imgElt.src = this.rep + this.tableaux[this.index].url;
		imgElt.alt = this.tableaux[this.index].url;
		titreElt = document.getElementById('titre-slide');
		titreElt.innerHTML = this.tableaux[this.index].title;
		pElt = document.getElementById('text-slide');
		pElt.innerHTML = this.tableaux[this.index].text;
	},

	avancerDiapo: function () {
		this.index++;
		if (this.index > this.tableaux.length-1) {
			this.index = 0;
		};
			this.afficherDiapo();	
	},

	reculerDiapo: function () {
		this.index--;
		if (this.index < 0) {
			this.index = this.tableaux.length-1;
		};
		this.afficherDiapo ();
	},

	

	sliderAuto: function () {
		var that = this;
		slideInterval = setInterval(function () {
			that.avancerDiapo();
		}, 5000);			
	},
	$('#playButton').click(function () {
                       that.sliderAuto();
                   });
        $('#pauseButton').click(function () {
                       that.sliderOff();
                   });

	sliderOff: function () {
		clearInterval(slideInterval);
	},

	eventsDiapo: function () {
		var that = this;
		// Ecoute des événements touches clavier
		$(document).on('keydown', function (e) {
			var touche = e.keyCode;
			if (touche === 39 || touche === 37) {
				that.sliderOff();
				if (touche === 39) {
					that.avancerDiapo();
				} else if (touche === 37) {
					that.reculerDiapo();
				}
			}
		});

		// Ecoute survol souris
		$('#conteneur-diapo').on('mouseover', function() {
			that.sliderOff();
		});
		
		// Ecoute survol souris en dehors de l'élément 
		$('#conteneur-diapo').on('mouseout', function() {
			that.sliderAuto();
		});

		// Ecoute commande droite et gauche
		$('#cmd-right').on('click', function() {
			that.avancerDiapo();
		});

		$('#cmd-left').on('click', function() {
			that.reculerDiapo();
		});
	}
}
