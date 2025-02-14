const equipos = [
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

let ronda = 1;

function generarPartidos(equipos) {
    const partidos = [];
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
            <label>
                <input type="checkbox" name="ganador-${ronda}-${index}" value="${equipo1.nombre}" onclick="seleccionarGanador(event, '${ronda}-${index}')"> ${equipo1.nombre}
            </label>
            <label>
                <input type="checkbox" name="ganador-${ronda}-${index}" value="${equipo2.nombre}" onclick="seleccionarGanador(event, '${ronda}-${index}')"> ${equipo2.nombre}
            </label>
            <button id="boton-${ronda}-${index}" onclick="finalizarPartido('${ronda}-${index}')">Partido Finalizado</button>
        `;

        listaPartidos.appendChild(partidoDiv);
    });

    rondaDiv.appendChild(listaPartidos);
    document.getElementById("rondas").appendChild(rondaDiv);
}

function seleccionarGanador(event, partidoId) {
    const checkboxes = document.querySelectorAll(`input[name="ganador-${partidoId}"]`);
    checkboxes.forEach(cb => {
        if (cb !== event.target) {
            cb.checked = false;
        }
    });
}

function finalizarPartido(partidoId) {
    const checkboxes = document.querySelectorAll(`input[name="ganador-${partidoId}"]:checked`);
    if (checkboxes.length === 0) {
        alert("Seleccionar ganador");
        return;
    }
    
    const ganador = checkboxes[0].value;
    const partido = document.getElementById(partidoId);
    const equipo1 = partido.querySelectorAll("input[type='checkbox']")[0].value;
    const equipo2 = partido.querySelectorAll("input[type='checkbox']")[1].value;

    // Buscar equipos
    const equipoGanador = equipos.find(e => e.nombre === ganador);
    const equipoPerdedor = equipos.find(e => e.nombre !== ganador && (e.nombre === equipo1 || e.nombre === equipo2));

    // Actualizar vidas y eliminar si es necesario
    if (equipoPerdedor.vidas > 1) {
        equipoPerdedor.vidas -= 1;
        equipoPerdedor.eliminado = false;
    } else {
        equipoPerdedor.eliminado = true;
    }

    // Deshabilitar botones y checkboxes
    document.getElementById(`boton-${partidoId}`).disabled = true;
    checkboxes.forEach(cb => cb.disabled = true);

    // Actualizar interfaz
    actualizarInterfaz();

    // Avanzar al siguiente partido si hay equipos restantes
    avanzarGanador(ganador);
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

function avanzarGanador(ganador) {
    const equiposRestantes = JSON.parse(localStorage.getItem("equiposRestantes")) || [];
    equiposRestantes.push(ganador);
    localStorage.setItem("equiposRestantes", JSON.stringify(equiposRestantes));

    if (equiposRestantes.length === 1) {
        alert("¡Ganador del torneo: " + equiposRestantes[0] + "!");
        return;
    }

    if (equiposRestantes.length % 2 === 0) {
        iniciarNuevaRonda();
    }
}

function iniciarNuevaRonda() {
    ronda++;
    const equiposRestantes = JSON.parse(localStorage.getItem("equiposRestantes")) || [];
    localStorage.setItem("equiposRestantes", JSON.stringify([]));
    
    const partidos = generarPartidos(equiposRestantes);
    crearRonda(partidos);
}

function iniciarTorneo() {
    localStorage.setItem("equiposRestantes", JSON.stringify([]));
    const partidos = generarPartidos([...equipos]);
    crearRonda(partidos);
}

iniciarTorneo();
