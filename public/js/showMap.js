
mapboxgl.accessToken =mapToken;
const map = new mapboxgl.Map({
container: 's-map', // container ID
style: 'mapbox://styles/mapbox/outdoors-v11', // style URL
center: pet.geometry.coordinates, // starting position [lng, lat]-7.0849336,31.794525
zoom:12 // starting zoom
});
map.addControl(new mapboxgl.NavigationControl());


new mapboxgl.Marker()
    .setLngLat(pet.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<h5>${pet.name}</h5> <p>${pet.location}</p>`
        )
    )
        .addTo(map)
mapboxgl.setRTLTextPlugin(
'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
null,
true // Lazy load the plugin
);