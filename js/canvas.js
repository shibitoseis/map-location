// Canvas - Signature

var canvas = {
	
	init : function () {
		this.canvas = $('#sign');
		this.context = this.canvas[0].getContext('2d');
		this.cursorX = '';
		this.cursorY = '';
		this.paint = false;
		this.starded = false;
   		this.color = '#A2C619';
   		this.prepareCanvas();
	},

// Méthode pour dessiner
	dessine : function() {

		if (!this.starded) {
			this.context.beginPath();
			this.context.moveTo(this.cursorX, this.cursorY);
			this.starded = true;
		}
		else {
			this.context.lineTo(this.cursorX, this.cursorY);
			this.context.strokeStyle = this.color;
			this.context.lineWidth = 4;
			this.context.stroke();
		}
	},

	move : function(e, media, elt) {
		if (this.paint) {
			if (media) {
				// Event mobile :
				var ev = e.originalEvent;
				e.preventDefault();
				
				// Coordonnées du doigt :
				this.cursorX = (ev.targetTouches[0].pageX - elt.offsetLeft); 
				this.cursorY = (ev.targetTouches[0].pageY - elt.offsetTop)-100; // décalage du curseur -100
			}
			else {

				// Coordonnées de la souris :
				this.cursorX = (e.pageX - elt.offsetLeft); 
				this.cursorY = (e.pageY - elt.offsetTop)-100; // décalage du curseur -100
			}
		
		// Dessine une ligne :
		this.dessine();
		}
	},

	moveEnd : function() {
		this.paint = false;
		this.starded = false;
	},

	moveStart : function(e, media, elt) {
		this.paint = true;
		// Coordonnées de la souris :
		if (media) {
			// Event mobile :
			var ev = e.originalEvent;
			e.preventDefault();
			// Coordonées du doigt :
			this.cursorX = ev.pageX - elt.offsetLeft;
			this.cursorY = (ev.pageY - elt.offsetTop)-100; // décalage du curseur -100
		}
		else {
			// Coordonnées de la souris :
			this.cursorX = e.pageX - elt.offsetLeft;
			this.cursorY = (e.pageY - elt.offsetTop)-100; // décalage du curseur -100
		}
		this.dessine();
	},

// fonction pour effacer le dessin
	clear : function() {
		this.context.clearRect(0,0, this.canvas[0].width, this.canvas[0].height);
	},

// Prépare le canvas en fonction des événements
	prepareCanvas : function () {
		this.context.lineJoin = "round";
		var that = this;

		// Click souris enfoncé sur le canvas
		$('#sign').on('mousedown', function(e){
		  that.moveStart(e, false, that.canvas[0]);
		});

		// Mouvement de la souris sur le canvas
		$('#sign').on('mousemove', function(e){
		  that.move(e, false, that.canvas[0]);
		});

		// Relachement du Click sur le canvas 
		$('#sign').on('mouseup', function(e) {
  			that.moveEnd();
		});

		// Clear canvas :
		$('#reset').on('click', function() {
			that.clear();
		});

		// appuie avec le doigt 
		$('#sign').on('touchstart', function(e) {
			that.moveStart(e, true, that.canvas[0]);
		});

		// Relachement du doigt 
		$('#sign').on('touchend', function() {
			that.moveEnd();
		});

		// deplacement du doigt 
		$('#sign').on('touchmove', function(e) {
			that.move(e, true, that.canvas[0]);
		});
	},


}