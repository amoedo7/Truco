let ronda = 1;
let equipos = [
    { nombre: "Equipo 1", vidas: 2, eliminado: false },
    { nombre: "Equipo 2", vidas: 2, eliminado: false },
    { nombre: "Equipo 3", vidas: 2, eliminado: false },
    { nombre: "Equipo 4", vidas: 2, eliminado: false },
    { nombre: "Equipo 5", vidas: 2, eliminado: false },
    { nombre: "Equipo 6", vidas: 2, eliminado: false },
    { nombre: "Equipo 7", vidas: 2, eliminado: false },
    { nombre: "Equipo 8", vidas: 2, eliminado: false },
    { nombre: "Equipo 9", vidas: 2, eliminado: false },
    { nombre: "Equipo 10", vidas: 2, eliminado: false },
    { nombre: "Equipo 11", vidas: 2, eliminado: false },
    { nombre: "Equipo 12", vidas: 2, eliminado: false },
    { nombre: "Equipo 13", vidas: 2, eliminado: false },
    { nombre: "Equipo 14", vidas: 2, eliminado: false },
    { nombre: "Equipo 15", vidas: 2, eliminado: false },
    { nombre: "Equipo 16", vidas: 2, eliminado: false }
];

function generarPartidos(equipos) {
    const partidos = [];
    if (equipos.length % 2 !== 0) {
        // Crear equipo comodín si el número de equipos es impar
        equipos.push({ nombre: "Comodín", vidas: 2, eliminado: false });
    }

    while (equipos.length > 1) {
        const equipo1 = equipos.shift();
        const equipo2 = equipos.shift();
        partidos.push({ equipo1, equipo2 });
    }
    return partidos;
}

function crearRonda(partidos) {
    const rondaDiv = document.createElement("div");
    rondaDiv.classList.add("ronda");
    rondaDiv.innerHTML = "<h2>Ronda " + ronda + "</h2>";
    
    const listaPartidos = document.createElement("div");
    listaPartidos.classList.add("partidos");

    partidos.forEach((partido, index) => {
        const partidoDiv = document.createElement("div");
        partidoDiv.classList.add("partido");

        const equipo1 = partido.equipo1;
        const equipo2 = partido.equipo2;

        partidoDiv.innerHTML = `
            <span ${equipo1.eliminado ? "class='eliminado'" : ""}>${equipo1.nombre} ${equipo1.vidas > 0 ? "☑️" : "❎"}</span>
            <span ${equipo2.eliminado ? "class='eliminado'" : ""}>${equipo2.nombre} ${equipo2.vidas > 0 ? "☑️" : "❎"}</span>
            <button onclick="eliminarVida('${ronda}-${index}', '${equipo1.nombre}', '${equipo2.nombre}')">Finalizar Partido</button>
        `;

        listaPartidos.appendChild(partidoDiv);
    });

    rondaDiv.appendChild(listaPartidos);
    document.getElementById("rondas").appendChild(rondaDiv);
}

function eliminarVida(partidoId, equipo1Nombre, equipo2Nombre) {
    const equipo1 = equipos.find(e => e.nombre === equipo1Nombre);
    const equipo2 = equipos.find(e => e.nombre === equipo2Nombre);

    // Actualizar vidas y eliminar si es necesario
    if (equipo1.vidas > 1) {
        equipo1.vidas -= 1;
    } else {
        equipo1.eliminado = true;
    }

    if (equipo2.vidas > 1) {
        equipo2.vidas -= 1;
    } else {
        equipo2.eliminado = true;
    }

    // Deshabilitar los botones
    const botones = document.querySelectorAll("button");
    botones.forEach(b => b.disabled = true);

    // Actualizar interfaz
    actualizarInterfaz();
}

function actualizarInterfaz() {
    const partidos = document.querySelectorAll(".partido");
    partidos.forEach(partido => {
        const equipo1 = partido.querySelectorAll("span")[0];
        const equipo2 = partido.querySelectorAll("span")[1];

        if (equipo1.innerText.includes("❎") || equipo2.innerText.includes("❎")) {
            partido.classList.add("eliminado");
        }
    });
}

function finalizarRonda() {
    // Filtrar los equipos ganadores y eliminados
    const equiposRestantes = equipos.filter(e => !e.eliminado);
    const equiposGanadores = equiposRestantes.length % 2 === 0 ? equiposRestantes : [...equiposRestantes, { nombre: "Comodín", vidas: 2, eliminado: false }];
    
    // Mezclar equipos aleatoriamente
    const equiposAleatorios = equiposGanadores.sort(() => Math.random() - 0.5);

    // Generar nuevos partidos para la siguiente ronda
    const partidos = generarPartidos(equiposAleatorios);
    ronda++;

    // Limpiar la interfaz y mostrar la siguiente ronda
    document.getElementById("rondas").innerHTML = '';
    crearRonda(partidos);
}

function iniciarTorneo() {
    const partidos = generarPartidos(equipos);
    crearRonda(partidos);
}

iniciarTorneo();
