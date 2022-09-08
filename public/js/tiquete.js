function destino() {
  const destino = document.getElementById("opcionDestino");
  document.getElementById("imgBandera").src = destino.value;
  const fecha = new Date();
  const añoActual = fecha.getFullYear();
  const diaActual = fecha.getDate();
  const mesActual = fecha.getMonth() + 1;
  const fechaActual = añoActual + "-" + mesActual + "-" + diaActual;
  destinoNombre();
}

function horario() {
  const horario = document.getElementById("zonaHoraria");
  document.getElementById("imgHorario").src = horario.value;
  horarioDia()
}

function fecha() {
  const fechaViaje = document.getElementById("fecha");
  let dia = fechaViaje.value;
  const fechaHtml = document.getElementById("fechaViaje");
  fechaHtml.innerHTML = dia;
}

function horarioDia() {
  const horarioDia = document.getElementById("imgHorario");
  const hora = document.getElementById("hora");

  if (horarioDia.src == "https://res.cloudinary.com/anonimous/image/upload/v1661171511/train%20tickets/horario/descarga_sr7nti_n1vbo1.png") {
    horaDia = "mañana";
    return (hora.innerHTML = "10 : 00 a.m");
  } else {
    if (horarioDia.src == "https://res.cloudinary.com/anonimous/image/upload/v1661172340/train%20tickets/horario/descarga_jn6fsz_zr89co.png") {
      horaDia = "tarde";
      return (hora.innerHTML = "3 : 00 p.m");
    } else {
      horaDia = "noche";
      return (hora.innerHTML = "8 : 00 p.m");
    }
  }
}

function destinoNombre() {
  const destino = document.getElementById("imgBandera");
  if (
    destino.src ==
    "https://res.cloudinary.com/anonimous/image/upload/v1661169566/train%20tickets/banderas/francia_ip2zud_e3dh7f.png"
  ) {
    destinoFinal = "francea";
  } else {
    destinoFinal = "londres";
  }
  return destinoFinal;
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


function pickData() {
  const datePick = document.getElementById('fechaViaje');
  dia = (datePick.textContent).toString();
};

let destinoFinal;
let horaDia;
let hora;
let dia;

if (horaDia == 'mañana') {
  hora = 4+":"+00+":"+00;
} else if (horaDia == 'tarde') {
  hora = 15+":"+00+":"+00;
} else {
  hora = 15+":"+00+":"+00;
}

function dataTikect() {
  console.log(horaDia, hora);
  let envio = new FormData();
  envio.append('destino', 'h');
  envio.append('fecha', 'hh')
  envio.append('hora', 'hhh')
  fetch(`http://localhost:3105/comprandoTiquete?destino=${destinoFinal}&hora=${hora}&fecha=${dia}`, {
    method: 'get'
  }).then(response => {
    console.log(response);
  }).then(data => {
    //handle data
    console.log(data);
  })
    .catch(error => {
      //handle error
      console.log(error)
    });
}