let victoriasUsuario = 0;
let victoriasMaquina = 0;


while (victoriasUsuario < 3 && victoriasMaquina < 3) {

  let jugada = prompt(`Marcador actual -> Tú: ${victoriasUsuario} | Máquina: ${victoriasMaquina}\n\nElige: Piedra, Papel o Tijera`);

  if (!jugada) break; 

 
  jugada = jugada.trim().toLowerCase();

  if (!["piedra", "papel", "tijera"].includes(jugada)) {
    alert("Opción no válida. Intenta de nuevo.");
    continue;
  }

  const azar = Math.random();
  let jugadaMaquina = "";

  if (azar < 0.33) {
    jugadaMaquina = "piedra";
  } else if (azar < 0.66) {
    jugadaMaquina = "papel";
  } else {
    jugadaMaquina = "tijera";
  }

  
  if (jugada === jugadaMaquina) {
    alert(`Ambos eligieron ${jugadaMaquina}. ¡Empate en esta ronda!`);
  } else if (
    (jugada === "piedra" && jugadaMaquina === "tijera") ||
    (jugada === "papel" && jugadaMaquina === "piedra") ||
    (jugada === "tijera" && jugadaMaquina === "papel")
  ) {
    victoriasUsuario++;
    alert(`La máquina eligió ${jugadaMaquina}. ¡Ganaste esta ronda!`);
  } else {
    victoriasMaquina++;
    alert(`La máquina eligió ${jugadaMaquina}. La máquina gana esta ronda.`);
  }
}


const mensajeGanador = victoriasUsuario === 3 
  ? ` ¡FELICIDADES, GANASTE EL TORNEO!\nResultado final: ${victoriasUsuario} - ${victoriasMaquina}` 
  : ` LA MÁQUINA GANÓ EL TORNEO.\nResultado final: ${victoriasMaquina} - ${victoriasUsuario}`;


alert(mensajeGanador);
console.log(mensajeGanador);