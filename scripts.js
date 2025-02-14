// Array de equipos iniciales
const equipos = [
    { nombre: "Los mates", jugadores: ["Juan", "Pedro"] },
    { nombre: "Los Tigres", jugadores: ["Maria", "Carlos"] },
    { nombre: "Las Águilas", jugadores: ["José", "Luis"] },
    { nombre: "Los Guerreros", jugadores: ["Raúl", "Pablo"] },
    { nombre: "El Escuadrón", jugadores: ["Ana", "Luis"] },
    { nombre: "Los Fantasmas", jugadores: ["David", "Marcos"] },
    { nombre: "Los Halcones", jugadores: ["Laura", "Antonio"] },
    { nombre: "Los Dragones", jugadores: ["Carlos", "Javier"] },
    { nombre: "Los Leones", jugadores: ["Eduardo", "Fernando"] },
    { nombre: "Los Lobos", jugadores: ["Ricardo", "José"] },
    { nombre: "Los Fénix", jugadores: ["Sofia", "Diana"] },
    { nombre: "Los Guerrilleros", jugadores: ["Marcelo", "Joaquín"] },
    { nombre: "Las Panteras", jugadores: ["Lucía", "Marta"] },
    { nombre: "Los Titanes", jugadores: ["Alfredo", "Gerardo"] },
    { nombre: "Los Águilas", jugadores: ["Tomás", "Raúl"] },
    { nombre: "Los Valkirias", jugadores: ["Mercedes", "Gabriel"] },
    { nombre: "Los Exploradores", jugadores: ["Carlos", "Antonio"] },
    { nombre: "Los Titanes", jugadores: ["Paula", "Laura"] },
    { nombre: "Los Ninjas", jugadores: ["Marta", "Elena"] },
    { nombre: "Los Guerreros", jugadores: ["Javier", "Miguel"] }
];

// Función para renderizar los equipos en el fixture
function renderFixture() {
    const fixtureDiv = document.getElementById('fixture');
    fixtureDiv.innerHTML = '';  // Limpiar el fixture antes de renderizar

    equipos.forEach((equipo, index) => {
        const roundDiv = document.createElement('div');
        roundDiv.classList.add('round');

        // Crear el div de cada partido
        const matchDiv = document.createElement('div');
        matchDiv.classList.add('match');
        matchDiv.innerHTML = `${equipo.nombre} <br><span>${equipo.jugadores.join(" y ")}</span>`;

        roundDiv.appendChild(matchDiv);
        fixtureDiv.appendChild(roundDiv);
    });
}

// Función para reinscribir a un equipo
function reinscribirEquipo() {
    const teamName = document.getElementById('team-name').value;
    if (teamName) {
        // Añadir el equipo al fixture
        equipos.push({ nombre: teamName, jugadores: ["Jugador 1", "Jugador 2"] });
        renderFixture();
        document.getElementById('team-name').value = '';  // Limpiar el campo
    } else {
        alert("Por favor, ingresa un nombre para el equipo.");
    }
}

// Inicializar el torneo
renderFixture();
