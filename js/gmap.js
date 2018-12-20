// Objet Gmap

var Gmap = {
    icon : 'images/biker_green.png',
    locStations : [],
    lyon : {lat:45.7563172, lng:4.827523},


// Initialisation de la Map dans son conteneur
    initMap : function () {
    	map = new google.maps.Map(document.getElementById('map'), {
          zoom : 16,
          center : this.lyon
        });
    },

// Création des marker 
	creerMarker : function(station) {
	    var marker = new google.maps.Marker({
    		  position: station.position,
    	    icon: this.icon,
          title: station.name,
    	    numStation: station.number,
    	    status: station.status,
    	    veloDispo: station.available_bikes,
    	    map: map
    	});
      
      marker.addListener('click', function() {
        map.setCenter(marker.position);
        stations.stationSelected(marker.numStation);

        reservation.closePanelReservation();
      });

	    // Affecte une icone au marker en fonction du status
	    if (marker.veloDispo < 10) {
	    	marker.icon = 'images/biker_yellow.png';
	    }
	    if (marker.status === 'CLOSED') {
	    	marker.icon = 'images/biker_red.png';
	    }

	    // Insertion dans le tableau de localisation
    	this.locStations.push(marker);
    },

// Regroupement des marker sur une même zone
  groupementMarker : function () {
    	var markerCluster = new MarkerClusterer(map, this.locStations, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
	},

// Zone de recherche par nom de rue dans un input
	rechercherRue : function () {
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);

        // SearchBox resultats sur affichage map.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        // Renvoie des info lorsque qu'un utilisateur sélectionne
        //un endroit et obtient des info sur l'endroit.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
              return;
            }

          // Pour chaque endroit, obtenir icone, nom et localisation.
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function(place) {
              if (!place.geometry) {
                  console.log("Le lieu de retour ne contient aucune géométrie");
                  return;
              }
              if (place.geometry.viewport) {
                  bounds.union(place.geometry.viewport);
              } else {
                  bounds.extend(place.geometry.location);
              }
          });
          map.fitBounds(bounds);
        });
	},
};