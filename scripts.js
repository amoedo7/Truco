document.addEventListener("DOMContentLoaded", function () {
    let equipos = [
        "Los Mates", "Los Ases", "Truco Viejo", "Los Campeones",
        "Choripanes", "Los Gauchos", "Pura Vida", "Mate Amargo",
        "Los Tablones", "Los Estrategas", "La Milonga", "Los Astutos",
        "Reyes del Truco", "Los Picantes", "El Reto", "Los Descartes",
        "Los Infiltrados", "Los Piratas", "Vieja Escuela", "Los Expertos"
    ];
    
    let torneo = document.getElementById("torneo");
    let rondaActual = 1;

    function generarFixture() {
        torneo.innerHTML = "";
        let rondaDiv = document.createElement("div");
        rondaDiv.classList.add("ronda");
        rondaDiv.innerHTML = `<h2>Ronda ${rondaActual}</h2>`;

        for (let i = 0; i < equipos.length; i += 2) {
            if (i + 1 < equipos.length) {
                let partido = document.createElement("div");
                partido.classList.add("partido");
                partido.innerHTML = `
                    <span class="equipo">${equipos[i]}</span>
                    <input type="checkbox" class="ganador">
                    <input type="checkbox" class="ganador">
                    <span class="equipo">${equipos[i + 1]}</span>
                    <button class="finalizarPartido">Finalizar Partido</button>
                `;
                rondaDiv.appendChild(partido);
            }
        }
        torneo.appendChild(rondaDiv);
    }

    document.getElementById("finalizarRonda").addEventListener("click", function () {
        let ganadores = [];
        let partidos = document.querySelectorAll(".partido");

        partidos.forEach(partido => {
            let checks = partido.querySelectorAll(".ganador");
            let equipo1 = partido.children[0].textContent;
            let equipo2 = partido.children[3].textContent;
            
            if (checks[0].checked) {
                ganadores.push(equipo1);
            } else if (checks[1].checked) {
                ganadores.push(equipo2);
            }
        });

        if (ganadores.length === equipos.length / 2) {
            rondaActual++;
            equipos = ganadores;
            generarFixture();
        } else {
            alert("Debe seleccionar un ganador para cada partido.");
        }
    });

    generarFixture();
});
