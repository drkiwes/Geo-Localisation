const map = L.map('map').setView([36.8065, 10.1815], 13); // Position initiale (Tunis)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let marker;

document.getElementById('trackButton').addEventListener('click', () => {
    const vehicleID = document.getElementById('vehicleID').value;
    if (vehicleID) {
        trackVehicle(vehicleID);
    }
});

function trackVehicle(vehicleID) {
    fetch(`http://votre-serveur.com/api/track/${vehicleID}`)
        .then(response => response.json())
        .then(data => {
            const { latitude, longitude } = data;
            if (marker) {
                marker.setLatLng([latitude, longitude]);
            } else {
                marker = L.marker([latitude, longitude]).addTo(map);
            }
            map.setView([latitude, longitude], 13);
        })
        .catch(err => console.error('Erreur:', err));
}
