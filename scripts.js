let torneo = JSON.parse(localStorage.getItem("torneo")) || {
    ronda: 1,
    equipos: [
        { nombre: "Equipo 1", vidas: 2, eliminado: false },
        { nombre: "Equipo 2", vidas: 2, eliminado: false },
        { nombre: "Equipo 3", vidas: 2, eliminado: false },
        { nombre: "Equipo 4", vidas: 2, eliminado: false },
        { nombre: "Equipo 5", vidas: 2, eliminado: false },
        { nombre: "Equipo 6", vidas: 2, eliminado: false },
        { nombre: "Equipo 7", vidas: 2, eliminado: false },
        { nombre: "Equipo 8", vidas: 2, eliminado: false }
    ],
    partidos: []
};

function guardarEstado() {
    localStorage.setItem("torneo", JSON.stringify(torneo));
}

function generarPartidos() {
    let equiposDisponibles = torneo.equipos.filter(e => !e.eliminado);
    if (equiposDisponibles.length % 2 !== 0) {
        equiposDisponibles.push({ nombre: "Comodín", vidas: 2, eliminado: false });
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
            <span ${partido.equipo1.eliminado ? "class='eliminado'" : ""}>${partido.equipo1.nombre} ${partido.equipo1.vidas > 0 ? "☑️" : "❎"}</span>
            <span ${partido.equipo2.eliminado ? "class='eliminado'" : ""}>${partido.equipo2.nombre} ${partido.equipo2.vidas > 0 ? "☑️" : "❎"}</span>
            <button id="boton${index}" onclick="finalizarPartido(${index})" ${partido.finalizado ? "disabled" : ""}>Finalizar Partido</button>
        `;
        
        rondaDiv.appendChild(partidoDiv);
    });

    rondasDiv.appendChild(rondaDiv);
    verificarFinalizarRonda();
}

function finalizarPartido(index) {
    const partido = torneo.partidos[index];
    if (!partido) return;
    
    partido.finalizado = true;
    
    const ganador = Math.random() > 0.5 ? partido.equipo1 : partido.equipo2;
    const perdedor = ganador === partido.equipo1 ? partido.equipo2 : partido.equipo1;
    
    if (perdedor.vidas > 1) {
        perdedor.vidas--;
    } else {
        perdedor.eliminado = true;
    }
    
    partido.ganador = ganador;
    
    document.getElementById("boton" + index).disabled = true;
    
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
        .filter(p => !p.ganador.eliminado)
        .map(p => p.ganador);
    
    torneo.partidos = [];
    
    if (torneo.equipos.length === 2) {
        alert("¡Final del torneo! " + torneo.equipos[0].nombre + " vs " + torneo.equipos[1].nombre");
    } else {
        generarPartidos();
        renderizarRonda();
    }
    
    guardarEstado();
}

function iniciarTorneo() {
    if (torneo.partidos.length === 0) {
        generarPartidos();
    }
    renderizarRonda();
}

iniciarTorneo();
