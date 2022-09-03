function destino() {
  const destino = document.getElementById("opcionDestino");
  document.getElementById("imgBandera").src = destino.value;
  destinoNombre();
}

function horario() {
  const horario = document.getElementById("zonaHoraria");
  document.getElementById("imgHorario").src = horario.value;
  horarioDia()
}




function fecha() {
  const fechaViaje = document.getElementById("fecha");
  let fecha = fechaViaje.value;

  const fechaHtml = document.getElementById("fechaViaje");
  return (fechaHtml.innerHTML = fecha), (fecha);
}

function horarioDia() {
  const horarioDia = document.getElementById("imgHorario");
  const hora = document.getElementById("hora");

  if (horarioDia.src == "https://res.cloudinary.com/anonimous/image/upload/v1661171511/train%20tickets/horario/descarga_sr7nti_n1vbo1.png") {
    let horario = "mañana";
    return console.log(horario), (hora.innerHTML = "10 : 00 a.m");
  } else {
    if (horarioDia.src == "https://res.cloudinary.com/anonimous/image/upload/v1661172340/train%20tickets/horario/descarga_jn6fsz_zr89co.png") {
      let horario = "tarde";
      return console.log(horario), (hora.innerHTML = "3 : 00 p.m");
    } else {
      let horario = "noche";
      return console.log(horario), (hora.innerHTML = "8 : 00 p.m");
    }
  }
}

function destinoNombre(destinoFinal) {
  const destino = document.getElementById("imgBandera");
  if (
    destino.src ==
    "https://res.cloudinary.com/anonimous/image/upload/v1661169566/train%20tickets/banderas/francia_ip2zud_e3dh7f.png"
  ) {
    let destinoFinal = "francea";
    return console.log(destinoFinal);
  } else {
    let destinoFinal = "londres";
    return console.log(destinoFinal);
  }
}

function sentidoViaje() {
  const sentidoViaje = document.getElementById("imgBandera");
  if (
    sentidoViaje.src ===
    "https://res.cloudinary.com/anonimous/image/upload/v1661169566/train%20tickets/banderas/francia_ip2zud_e3dh7f.png"
  ) {
    const textoDestino = document.getElementById("sentidoViaje");
    return (textoDestino.innerHTML = "\\__Londres -- Francia__/");
  } else {
    const textoDestino = document.getElementById("sentidoViaje");
    return (textoDestino.innerHTML = "\\__Francia -- Londres__/");
  }
}

function ramdom() {
  let rango = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  let codigo = "";
  for (let i = 0; i < 9; i++) {
    codigo += rango[Math.floor(Math.random() * 10)];
  }
  return console.log(codigo);
}