// Lista de los 20 equipos
let equipos = [
    "Equipo 1", "Equipo 2", "Equipo 3", "Equipo 4", "Equipo 5", 
    "Equipo 6", "Equipo 7", "Equipo 8", "Equipo 9", "Equipo 10",
    "Equipo 11", "Equipo 12", "Equipo 13", "Equipo 14", "Equipo 15", 
    "Equipo 16", "Equipo 17", "Equipo 18", "Equipo 19", "Equipo 20"
];

// Función para generar el fixture
function generarFixture() {
    // Barajamos los equipos aleatoriamente
    equipos = equipos.sort(() => Math.random() - 0.5);

    // Crear la tabla HTML para mostrar el fixture
    let fixtureHTML = '<table border="1"><thead><tr><th>Ronda</th><th>Partido</th></tr></thead><tbody>';

    // Creamos los partidos
    for (let i = 0; i < equipos.length / 2; i++) {
        let ronda = Math.floor(i / 2) + 1;
        fixtureHTML += `
            <tr>
                <td>Ronda ${ronda}</td>
                <td>${equipos[i]} vs ${equipos[i + 1]}</td>
            </tr>
        `;
    }

    fixtureHTML += '</tbody></table>';

    // Insertamos el fixture en el contenedor
    document.getElementById('fixture-container').innerHTML = fixtureHTML;
}
