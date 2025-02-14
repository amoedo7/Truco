const equipos = [
    { nombre: "Equipo 1", jugadores: "Juan y Pedro", cruces: 0 },
    { nombre: "Equipo 2", jugadores: "Carlos y Luis", cruces: 0 },
    { nombre: "Equipo 3", jugadores: "Ana y Marta", cruces: 0 },
    { nombre: "Equipo 4", jugadores: "Sofia y Raúl", cruces: 0 },
    { nombre: "Equipo 5", jugadores: "José y Diego", cruces: 0 },
    { nombre: "Equipo 6", jugadores: "Miguel y Andrés", cruces: 0 },
    { nombre: "Equipo 7", jugadores: "Pedro y Paula", cruces: 0 },
    { nombre: "Equipo 8", jugadores: "Luis y Samuel", cruces: 0 },
    { nombre: "Equipo 9", jugadores: "Carlos y Javier", cruces: 0 },
    { nombre: "Equipo 10", jugadores: "Pablo y Daniel", cruces: 0 },
    { nombre: "Equipo 11", jugadores: "Sara y Beatriz", cruces: 0 },
    { nombre: "Equipo 12", jugadores: "Raquel y Tomás", cruces: 0 },
    { nombre: "Equipo 13", jugadores: "Victor y Manuel", cruces: 0 },
    { nombre: "Equipo 14", jugadores: "Esteban y Elena", cruces: 0 },
    { nombre: "Equipo 15", jugadores: "Rosa y Juan", cruces: 0 },
    { nombre: "Equipo 16", jugadores: "Esteban y Clara", cruces: 0 },
    { nombre: "Equipo 17", jugadores: "Martín y Laura", cruces: 0 },
    { nombre: "Equipo 18", jugadores: "Rafael y Sergio", cruces: 0 },
    { nombre: "Equipo 19", jugadores: "Antonio y Gabriel", cruces: 0 },
    { nombre: "Equipo 20", jugadores: "Ricardo y David", cruces: 0 }
];

let ronda = 1;
let equiposEliminados = [];

function generarPartidos(equipos) {
    const partidos = [];
    while (equipos.length > 1) {
        const partido = {
            equipo1: equipos.shift(),
            equipo2: equipos.shift()
        };
        partidos.push(partido);
    }
    return partidos;
}

function crearRonda(partidos) {
    const rondaDiv = document.createElement("div");
    rondaDiv.classList.add("ronda");
    rondaDiv.innerHTML = "<h2>Ronda " + ronda++ + "</h2>";
    const listaPartidos = document.createElement("div");
    listaPartidos.classList.add("partidos");
    partidos.forEach(partido => {
        const partidoDiv = document.createElement("div");
        partidoDiv.classList.add("partido");

        // Corrección del uso de comillas
        partidoDiv.innerHTML = `
            <div>${partido.equipo1.nombre} vs ${partido.equipo2.nombre}</div>
            <label>
                <input type="checkbox" data-equipo="${partido.equipo1.nombre}" onclick="marcarResultado(event, '${partido.equipo1.nombre}')"> ${partido.equipo1.jugadores} (Ganador)
            </label>
            <label>
                <input type="checkbox" data-equipo="${partido.equipo2.nombre}" onclick="marcarResultado(event, '${partido.equipo2.nombre}')"> ${partido.equipo2.jugadores} (Ganador)
            </label>
        `;

        listaPartidos.appendChild(partidoDiv);
    });
    rondaDiv.appendChild(listaPartidos);
    document.getElementById("rondas").appendChild(rondaDiv);
}

function marcarResultado(event, equipo) {
    const checkbox = event.target;
    if (checkbox.checked) {
        const equipoSeleccionado = equipos.find(e => e.nombre === equipo);
        if (equipoSeleccionado.cruces < 2) {
            equipoSeleccionado.cruces++;
        } else {
            alert("Este equipo ya tiene dos cruces y no puede reinscribirse.");
            checkbox.checked = false;
        }
    }
}

function iniciarTorneo() {
    let equiposRestantes = [...equipos];
    while (equiposRestantes.length > 1) {
        const partidos = generarPartidos(equiposRestantes);
        crearRonda(partidos);
    }
}

iniciarTorneo();
