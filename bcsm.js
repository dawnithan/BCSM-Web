var coordX = 53.342264,
	coordY = -6.353818;
	
var topLeft = L.latLng(53.401754, -6.488649),
	bottomRight = L.latLng(53.274380, -6.193634),
	bounds = L.latLngBounds(topLeft, bottomRight);
	
var map = L.map('map', {
	maxBounds: bounds,
	maxZoom: 18,
	minZoom: 12
}).setView([coordX, coordY], 14);

L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
	attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
}).addTo(map);

var markers = L.markerClusterGroup({
	disableClusteringAtZoom: 18
});

var geojson = new L.geoJson(data, {
	pointToLayer: function(feature, latlng) {
		var type = feature.properties.Type;
		switch (type) {
			case "Citizen Service":
				var csIcon = new L.Icon({
					iconUrl: 'markers/citizens_marker.png',
					iconSize: [30, 48],
					iconAnchor: [16, 34],
					popupAnchor: [0, -30]
				});
				return L.marker(latlng, {icon: csIcon});
			break;
			case "Education":
				var eduIcon = new L.Icon({
					iconUrl: 'markers/education_marker.png',
					iconSize: [30, 48],
					iconAnchor: [16, 34],
					popupAnchor: [0, -30]
				});
				return L.marker(latlng, {icon: eduIcon});
			break;
			case "Health":
				var healthIcon = new L.Icon({
					iconUrl: 'markers/health_marker.png',
					iconSize: [30, 48],
					iconAnchor: [16, 34],
					popupAnchor: [0, -30]
				});
				return L.marker(latlng, {icon: healthIcon});
			break;
			case "Sport":
				var sportIcon = new L.Icon({
					iconUrl: 'markers/sport_marker.png',
					iconSize: [30, 48],
					iconAnchor: [16, 34],
					popupAnchor: [0, -30]
				});
				return L.marker(latlng, {icon: sportIcon});
			break;
		}
	},
	onEachFeature: function(feature, layer) {
		layer.bindPopup('<h2>' + feature.properties.Name + '</h2>' + 
						feature.properties.Address + '<br>' +
						feature.properties.Phone + '<br>' +
						'<a href="http://'+feature.properties.Website+'">'+feature.properties.Website+'</a>' + '<br>' +
						'<a href="mailto:'+feature.properties.Email+'">'+feature.properties.Email+'</a>');
	}
});

markers.addLayer(geojson);
map.addLayer(markers);