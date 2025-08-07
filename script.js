// Menu mobile navbar
document.addEventListener('DOMContentLoaded', function () {
    const burgerBtn = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    if (burgerBtn && mobileMenu) {
        burgerBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
        // Optionnel : Fermer le menu mobile si on clique sur un lien
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }


    // Data
    const roadtripStops = [
    {
        id: 1,
        name: "Départ – Fafe",
        coordinates: [41.4507439, -8.1754442],
        date: "14/08/2025 - 10H00",
        description: "Départ de l’aventure depuis Fafe.",
        image: "./assets/Fafe.jpg"
    },
    {
        id: 2,
        name: "Étape – Monsul",
        coordinates: [41.6163613, -8.3055217],
        date: "14/08/2025 - 10H30",
        description: "Petite pause à Monsul pour admirer la campagne portugaise.",
        image: "./assets/monsul.jpg"
    },
    {
        id: 3,
        name: "Pause – Rendufe (Carcavelos)",
        coordinates: [41.63498, -8.399922],
        date: "14/08/2025 - 11H00",
        description: "Arrêt à Rendufe, quartier de Carcavelos.",
        image: "./assets/Renduf.jpeg"
    },
    {
        id: 4,
        name: "Déjeuner – Restaurante Lua de Mel",
        coordinates: [41.7151864, -8.3146689],
        date: "14/08/2025 - 12H30",
        description: "Déjeuner typique au restaurant Lua de Mel.",
        image: "./assets/LuaDeMel.jpeg"
    },
    {
        id: 5,
        name: "Spot nature – O Abocanhado",
        coordinates: [41.7642175, -8.2394988],
        date: "14/08/2025 - 14H00",
        description: "Découverte du point de vue O Abocanhado.",
        image: "./assets/Abocanhado.jpg"
    },
    {
        id: 6,
        name: "Barragem de Vilarinho das Furnas",
        coordinates: [41.7636306, -8.2090341],
        date: "14/08/2025 - 15H00",
        description: "Pause photo au barrage de Vilarinho das Furnas.",
        image: "./assets/vilarinho.jpg"
    },
    {
        id: 7,
        name: "Mirante Velho",
        coordinates: [41.7139473, -8.1766441],
        date: "14/08/2025 - 16H00",
        description: "Panorama incroyable sur la vallée.",
        image: "./assets/mirantevelho.jpg"
    },
    {
        id: 8,
        name: "Arrivée – Lagoa, Fafe",
        coordinates: [41.5174788, -8.0867731],
        date: "14/08/2025 - 17H00",
        description: "Arrivée pour le goûter à la Lagoa CAPITAL.",
        image: "./assets/lagoa.jpeg"
    }
];


    const participants = [
        { id: 1, name: "David", car: "BMW E30 325i", role: "+ 3 personnes" },
        { id: 2, name: "Abel", car: "BMW E36 325i", role: "+ 1 personnes" },
        { id: 3, name: "Kevin", car: "BMW E93", role: "+ 2 personnes" },
        { id: 4, name: "Cedric", car: "BMW M5", role: "+ 1 personnes" },
        { id: 5, name: "Sergio", car: "BMW M3 E36", role: "+ 1 personnes" },
        { id: 6, name: "Jorge", car: "BMW M2", role: "+ 1 personnes" },
        { id: 7, name: "Luis", car: "BMW E46 330i", role: "+ 1 personnes" },
        { id: 8, name: "Dylan", car: "BMW E92 325", role: "+ 3 personnes" },
        { id: 9, name: "Herve", car: "BMW M3 E93", role: "+ 0 personnes" },
        { id: 10, name: "Patrick", car: "BMW E36", role: "+ 1 personnes" },
        { id: 11, name: "Jorge", car: "BMW E30 323", role: "+ 1 personnes" },
        { id: 12, name: "Xavi", car: "BMW M4", role: "+ 0 personnes" },
        { id: 13, name: "Christophe", car: "BMW E30", role: "+ 0 personnes" }
    ];

    // Initialize map
    const map = L.map('roadtripMap').setView([41.65, -8.25], 10);

    // Icône verte pour le départ
    const greenIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize:     [25, 41],
        iconAnchor:   [12, 41],
        popupAnchor:  [1, -34],
        shadowSize:   [41, 41]
    });

    // Icône rouge pour l’arrivée
    const redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize:     [25, 41],
        iconAnchor:   [12, 41],
        popupAnchor:  [1, -34],
        shadowSize:   [41, 41]
    });
    

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add markers for each stop
    roadtripStops.forEach((stop, idx) => {
    let icon = undefined;
    if(idx === 0) icon = greenIcon; // Premier = vert
    else if(idx === roadtripStops.length - 1) icon = redIcon; // Dernier = rouge
    const marker = L.marker(stop.coordinates, icon ? {icon} : {}).addTo(map)
            .bindPopup(`
                <div class="marker-popup">
                    <h4 class="font-bold text-lg">${stop.name}</h4>
                    <p class="text-sm text-gray-600">${stop.date}</p>
                    <img src="${stop.image}" alt="${stop.name}" class="my-2">
                    <p class="text-sm">${stop.description}</p>
                </div>
            `);
        marker.on('add', function () {
            setTimeout(() => {
                marker._icon.classList.add('animate-bounce');
            }, 100 * stop.id);
        });
    });

    const bmwPolyline = L.polyline(
    roadtripStops.map(stop => stop.coordinates),
    {
        color: '#00AEEF', 
        weight: 4,        
        opacity: 0.7,     
        dashArray: '8, 12' 
    }
).addTo(map);

    // Populate gallery
    const galleryContainer = document.querySelector('#galerie .grid');
    roadtripStops.forEach(stop => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1';
        galleryItem.innerHTML = `
            <img src="${stop.image}" alt="${stop.name}" class="w-full h-48 object-cover" loading="lazy">
            <div class="p-4">
                <h3 class="font-bold text-lg mb-2">${stop.name}</h3>
                <p class="text-gray-600 text-sm">${stop.date}</p>
                <p class="mt-2 text-sm">${stop.description.substring(0, 100)}...</p>
            </div>
        `;
        galleryContainer.appendChild(galleryItem);
    });

    // Participants modal functionality
    const participantsCount = document.getElementById('participantsCount');
    const participantsModal = document.getElementById('participantsModal');
    const closeModal = document.getElementById('closeModal');
    const participantsList = document.getElementById('participantsList');

    // Populate participants list
    participants.forEach(participant => {
        const participantItem = document.createElement('div');
        participantItem.className = 'border-b border-gray-200 pb-4';
        participantItem.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <h4 class="font-bold">${participant.name}</h4>
                    <p class="text-sm text-gray-600">${participant.role}</p>
                </div>
                <span class="bg-bmw-blue text-white text-xs px-3 py-1 rounded-full">${participant.car}</span>
            </div>
        `;
        participantsList.appendChild(participantItem);
    });

    participantsCount.addEventListener('click', () => {
        participantsModal.classList.remove('hidden');
         document.body.classList.add('body-modal-open');
    });

    closeModal.addEventListener('click', () => {
        participantsModal.classList.add('hidden');
        document.body.classList.remove('body-modal-open'); 
    });

    // Close modal when clicking outside
    participantsModal.addEventListener('click', (e) => {
        if (e.target === participantsModal) {
            participantsModal.classList.add('hidden');
            document.body.classList.remove('body-modal-open'); 
        }
    });
});
