let torneo = JSON.parse(localStorage.getItem("torneo")) || {
    ronda: 1,
    equipos: [
        { nombre: "Equipo 1", jugadores: "Juan & Pedro", vidas: 2 },
        { nombre: "Equipo 2", jugadores: "Carlos & Diego", vidas: 2 },
        { nombre: "Equipo 3", jugadores: "Luis & Martín", vidas: 2 },
        { nombre: "Equipo 4", jugadores: "Ana & Sofía", vidas: 2 },
        { nombre: "Equipo 5", jugadores: "Roberto & Miguel", vidas: 2 },
        { nombre: "Equipo 6", jugadores: "Laura & Verónica", vidas: 2 },
        { nombre: "Equipo 7", jugadores: "Ricardo & Javier", vidas: 2 },
        { nombre: "Equipo 8", jugadores: "Paula & Mariana", vidas: 2 }
    ],
    partidos: []
};

function guardarEstado() {
    localStorage.setItem("torneo", JSON.stringify(torneo));
}

function generarPartidos() {
    let equiposDisponibles = torneo.equipos.filter(e => e.vidas > 0);
    if (equiposDisponibles.length % 2 !== 0) {
        equiposDisponibles.push({ nombre: "Comodín", jugadores: "Nadie & Nadie", vidas: 2 });
    }
    equiposDisponibles = equiposDisponibles.sort(() => Math.random() - 0.5);
    torneo.partidos = [];
    
    while (equiposDisponibles.length > 1) {
        torneo.partidos.push({
            equipo1: equiposDisponibles.shift(),
            equipo2: equiposDisponibles.shift(),
            finalizado: false,
            ganador: null
        });
    }
    guardarEstado();
}

function renderizarRonda() {
    const rondasDiv = document.getElementById("rondas");
    rondasDiv.innerHTML = "";
    const rondaDiv = document.createElement("div");
    rondaDiv.classList.add("ronda");
    rondaDiv.innerHTML = "<h2>Ronda " + torneo.ronda + "</h2>";
    
    torneo.partidos.forEach((partido, index) => {
        const partidoDiv = document.createElement("div");
        partidoDiv.classList.add("partido");
        
        partidoDiv.innerHTML = `
            <span class="equipo" onclick="marcarGanador(${index}, 1)">
                ${partido.equipo1.nombre} (${partido.equipo1.jugadores}) ${partido.equipo1.vidas > 1 ? "❤️" : ""}
            </span>
            <input type="checkbox" id="checkbox${index}-1">
            
            <span class="equipo" onclick="marcarGanador(${index}, 2)">
                ${partido.equipo2.nombre} (${partido.equipo2.jugadores}) ${partido.equipo2.vidas > 1 ? "❤️" : ""}
            </span>
            <input type="checkbox" id="checkbox${index}-2">
            
            <button id="boton${index}" onclick="finalizarPartido(${index})" ${partido.finalizado ? "disabled" : ""}>Finalizar Partido</button>
        `;
        
        rondaDiv.appendChild(partidoDiv);
    });

    rondasDiv.appendChild(rondaDiv);
    verificarFinalizarRonda();
}

function marcarGanador(index, equipo) {
    document.getElementById(`checkbox${index}-1`).checked = (equipo === 1);
    document.getElementById(`checkbox${index}-2`).checked = (equipo === 2);
}

function finalizarPartido(index) {
    const partido = torneo.partidos[index];
    if (!partido) return;

    const equipo1Check = document.getElementById(`checkbox${index}-1`).checked;
    const equipo2Check = document.getElementById(`checkbox${index}-2`).checked;

    if (!equipo1Check && !equipo2Check) return;

    partido.finalizado = true;
    partido.ganador = equipo1Check ? partido.equipo1 : partido.equipo2;
    const perdedor = equipo1Check ? partido.equipo2 : partido.equipo1;

    if (perdedor.vidas > 1) {
        perdedor.vidas--;
    } else {
        perdedor.vidas = 0;
    }

    guardarEstado();
    renderizarRonda();
}

function verificarFinalizarRonda() {
    const todosFinalizados = torneo.partidos.every(p => p.finalizado);
    document.getElementById("finalizarRonda").disabled = !todosFinalizados;
}

function finalizarRonda() {
    torneo.ronda++;
    torneo.equipos = torneo.partidos
        .filter(p => p.ganador)
        .map(p => p.ganador);
    torneo.partidos = [];
    generarPartidos();
    renderizarRonda();
    guardarEstado();
}

function iniciarTorneo() {
    if (torneo.partidos.length === 0) {
        generarPartidos();
    }
    renderizarRonda();
}

iniciarTorneo();
