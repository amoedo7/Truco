/* Función auxiliar para barajar un arreglo */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/* Estado inicial del torneo */
let torneo = JSON.parse(localStorage.getItem("torneo")) || {
  ronda: 1,
  equipos: [
    { nombre: "Equipo 1", jugadores: "Juan & Pedro", vidas: 1 },
    { nombre: "Equipo 2", jugadores: "Carlos & Diego", vidas: 1 },
    { nombre: "Equipo 3", jugadores: "Luis & Martín", vidas: 1 },
    { nombre: "Equipo 4", jugadores: "Ana & Sofía", vidas: 1 },
    { nombre: "Equipo 5", jugadores: "Roberto & Miguel", vidas: 1 },
    { nombre: "Equipo 6", jugadores: "Laura & Verónica", vidas: 1 },
    { nombre: "Equipo 7", jugadores: "Ricardo & Javier", vidas: 1 },
    { nombre: "Equipo 8", jugadores: "Paula & Mariana", vidas: 1 }
  ],
  partidos: []
};

function guardarEstado() {
  localStorage.setItem("torneo", JSON.stringify(torneo));
}

/* Genera los partidos de la ronda actual.
   Si el número de equipos es impar, agrega un Comodín. */
function generarPartidos(equipos) {
  let teams = equipos.slice();
  if (teams.length % 2 !== 0) {
    teams.push({ nombre: "Comodín", jugadores: "Nadie & Nadie", vidas: 1 });
  }
  teams = shuffle(teams);
  let partidos = [];
  for (let i = 0; i < teams.length; i += 2) {
    partidos.push({
      equipo1: teams[i],
      equipo2: teams[i + 1],
      finalizado: false,
      ganador: null
    });
  }
  return partidos;
}

/* Renderiza la ronda actual: muestra cada partido con los dos equipos, 
   cada uno con su nombre, jugadores y un corazón si tienen vida, junto con 
   radio buttons para elegir al ganador y un botón para finalizar el partido. */
function renderizarRonda() {
  const fixtureDiv = document.getElementById("fixture");
  fixtureDiv.innerHTML = "<h2>Ronda " + torneo.ronda + "</h2>";
  torneo.partidos.forEach((partido, index) => {
    const matchDiv = document.createElement("div");
    matchDiv.className = "partido" + (partido.finalizado ? " disabled" : "");
    
    // Crea elementos para cada equipo
    const equipo1Span = document.createElement("span");
    equipo1Span.className = "equipo" + (partido.equipo1.vidas === 0 ? " eliminado" : "");
    equipo1Span.innerHTML = partido.equipo1.nombre + " (" + partido.equipo1.jugadores + ") " + (partido.equipo1.vidas > 0 ? "❤️" : "❎");
    
    const equipo2Span = document.createElement("span");
    equipo2Span.className = "equipo" + (partido.equipo2.vidas === 0 ? " eliminado" : "");
    equipo2Span.innerHTML = partido.equipo2.nombre + " (" + partido.equipo2.jugadores + ") " + (partido.equipo2.vidas > 0 ? "❤️" : "❎");
    
    // Formulario con radio buttons para elegir el ganador (única selección)
    const form = document.createElement("form");
    form.innerHTML = `
      <label><input type="radio" name="match${index}" value="1" ${partido.finalizado ? "disabled" : ""}> Ganador</label>
      <label><input type="radio" name="match${index}" value="2" ${partido.finalizado ? "disabled" : ""}> Ganador</label>
    `;
    
    // Botón para finalizar el partido
    const finalButton = document.createElement("button");
    finalButton.textContent = "Finalizar Partido";
    finalButton.disabled = partido.finalizado;
    finalButton.onclick = function(e) {
      e.preventDefault();
      finalizarPartido(index);
    };
    
    matchDiv.appendChild(equipo1Span);
    matchDiv.appendChild(form);
    matchDiv.appendChild(equipo2Span);
    matchDiv.appendChild(finalButton);
    
    fixtureDiv.appendChild(matchDiv);
  });
  
  // Habilita el botón global "Finalizar Ronda" solo si todos los partidos están finalizados
  const todosFinalizados = torneo.partidos.every(p => p.finalizado);
  document.getElementById("finalizarRonda").disabled = !todosFinalizados;
}

/* Finaliza un partido: si se seleccionó un ganador, registra el ganador,
   y al perdedor le quita la vida (si ya no tiene, queda eliminado).
   Luego deshabilita el partido. */
function finalizarPartido(index) {
  const partido = torneo.partidos[index];
  if (partido.finalizado) return;
  
  const radios = document.getElementsByName("match" + index);
  let seleccionado = null;
  for (let radio of radios) {
    if (radio.checked) {
      seleccionado = radio.value;
      break;
    }
  }
  if (!seleccionado) {
    alert("Selecciona un ganador");
    return;
  }
  
  partido.finalizado = true;
  if (seleccionado === "1") {
    partido.ganador = partido.equipo1;
    // Al perdedor se le quita la vida
    if (partido.equipo2.vidas > 0) partido.equipo2.vidas = 0;
  } else {
    partido.ganador = partido.equipo2;
    if (partido.equipo1.vidas > 0) partido.equipo1.vidas = 0;
  }
  guardarEstado();
  renderizarRonda();
}

/* Al finalizar la ronda, se recogen los ganadores de cada partido,
   se mezclan aleatoriamente (y si es impar se agrega un Comodín) y se generan nuevos partidos.
   Si solo queda un equipo, se declara campeón. */
function finalizarRonda() {
  let ganadores = torneo.partidos.map(p => p.ganador).filter(g => g != null);
  if (ganadores.length < 1) {
    alert("No hay ganadores para avanzar.");
    return;
  }
  if (ganadores.length % 2 !== 0) {
    ganadores.push({ nombre: "Comodín", jugadores: "Nadie & Nadie", vidas: 1 });
  }
  torneo.ronda++;
  torneo.equipos = shuffle(ganadores);
  torneo.partidos = generarPartidos(torneo.equipos);
  guardarEstado();
  renderizarRonda();
  if (torneo.equipos.length === 1) {
    alert("¡Campeón: " + torneo.equipos[0].nombre + "!");
  }
}

/* Guarda el estado del torneo en localStorage */
function guardarEstado() {
  localStorage.setItem("torneo", JSON.stringify(torneo));
}

/* Inicializa el torneo: si no hay estado previo, genera la primera ronda */
function iniciarTorneo() {
  if (!localStorage.getItem("torneo")) {
    torneo.partidos = generarPartidos(torneo.equipos);
    guardarEstado();
  } else {
    torneo = JSON.parse(localStorage.getItem("torneo"));
  }
  renderizarRonda();
}

iniciarTorneo();
