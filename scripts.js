const equipos = [
    "Equipo 1", "Equipo 2", "Equipo 3", "Equipo 4",
    "Equipo 5", "Equipo 6", "Equipo 7", "Equipo 8",
    "Equipo 9", "Equipo 10", "Equipo 11", "Equipo 12",
    "Equipo 13", "Equipo 14", "Equipo 15", "Equipo 16"
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

        partidoDiv.innerHTML = `
            <span>${partido.equipo1} vs ${partido.equipo2}</span>
            <label>
                <input type="checkbox" name="ganador-${ronda}-${index}" value="${partido.equipo1}" onclick="seleccionarGanador(event, '${ronda}-${index}')"> ${partido.equipo1}
            </label>
            <label>
                <input type="checkbox" name="ganador-${ronda}-${index}" value="${partido.equipo2}" onclick="seleccionarGanador(event, '${ronda}-${index}')"> ${partido.equipo2}
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

    // Deshabilitar botón y checkboxes después de seleccionar ganador
    document.getElementById(`boton-${partidoId}`).disabled = true;
    checkboxes.forEach(cb => cb.disabled = true);

    avanzarGanador(ganador);
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
