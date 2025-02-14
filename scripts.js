function registrarResultado(partido, ganador) {
    let lista = document.getElementById("ganadores");
    let item = document.createElement("li");
    item.textContent = ganador + " ha ganado el " + partido;
    lista.appendChild(item);

    // Hacer que los botones de ese partido desaparezcan después de registrar el resultado
    let matchDiv = document.getElementById(partido);
    matchDiv.querySelectorAll("button").forEach(button => button.style.display = "none");

    // Si quieres actualizar la ronda o algo más aquí, también puedes hacerlo
}
