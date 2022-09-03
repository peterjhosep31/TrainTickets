const express = require("express");
const sessions = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { promises } = require("nodemailer/lib/xoauth2/index.js");
const stripe = require("stripe") ("sk_test_51LVHhtJqwXpikLDTcXdoFKWZdrGnhFUIaJuRKyNpcsZJLUmmt3if2wkzWI5xrjAeJ3VAyEw7Ja0VA9hWMEfPIKET00IjVxWO7G");
const db = new sqlite3.Database("./db/traintiquets.db");
const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.set("view engine", "ejs");
server.use(cookieParser());

const port = 3105;
const timeExp = 1000 * 60 * 60;

// import { fecha } from "/public/js/tiquete.js";


server.use(
  sessions({
    secret: "rfghf66a76ythggi87au7td",
    saveUninitialized: true,
    cookie: { maxAge: timeExp },
    resave: false,
  })
);




server.get("/", (req, res) => {
  res.render("principal");
});


server.get("/inicio", (req, res) => {
  res.render("iniciar");
});

server.post("/login", (req, res) => {
  let correo = req.body.correo;
  let contraseña = req.body.contraseña;
  db.get(
    "SELECT contraseña FROM registro WHERE correo=$correo",
    {
      $correo: correo,
    },
    (error, rows) => {
      if (rows) {
        if (bcrypt.compareSync(contraseña, rows.contraseña)) {
          session = req.session;
          session.correo = correo;
          return res.render("iniciada");
        }
        return res.send("La contraseña es incorrecta");
      }
      return res.send("El usuario no existe");
    }
  );
});



server.get("/registro", (req, res) => {
  res.render("registro");
});

server.post("/registro", (req, res) => {
  let nombres = req.body.nombres;
  let apellidos = req.body.apellidos;
  let correo = req.body.correo;
  let contraseña = req.body.contraseña;
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(contraseña, salt);
  db.get(
    `INSERT INTO registro(nombres, apellidos, correo,  contraseña) VALUES(?,?,?,?)`,
    [nombres, apellidos, correo, hash],
    function (error) {
      if (!error) {
        console.log("insert ok");
        return res.render("principal");
      } else {
        return console.log("inset error", error);
      }
    }
  );
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "tickettrain121@gmail.com",
      pass: "djdmzdctvzccztor",
    },
  });
  transporter
    .sendMail({
      from: "tickettrain121@gmail.com",
      to: correo,
      subject: "Registro exitoso",
      html: "<h1>SU REGISTRO FUE EXITOSO</h1><p>Apreciado Usuario(a), el presente correo es para informar que ha sido registrado(a) correctamente en nuestro aplicativo web <b>Train Tiquets</b> Esperamos que nuestra aplicación sea de su agrado y disfrute de todas las herramientas brindadas en esta web</p>",
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
});



server.get("/logOut", (req, res) => {
  session = req.session;
  if (session.correo) {
    req.session.destroy();
    return res.redirect("/");
  }
  return res.send("No tiene sesion para cerrar");
});



server.get("/recuperar", (req, res) => {
  res.render("validarCorreo");
});


server.post("/correoAutentificado", (req, res) => {
  let correo = req.body.correo;
  db.get(
    "SELECT nombres FROM registro WHERE correo=$correo",
    {
      $correo: correo,
    },
    (error, rows) => {
      let nombre = rows.nombres;
      if (!error) {
        res.render("recuperarContraseña");
        let contraseñaDefinitiva = random();
        //? envia el correo de la nueva contraseña
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          auth: {
            user: "tickettrain121@gmail.com",
            pass: "djdmzdctvzccztor",
          },
        });
        transporter
          .sendMail({
            from: "tickettrain121@gmail.com",
            to: correo,
            subject: "Recuperar contraseña",
            html:
              "hola " +
              nombre +
              " su nueva contraseña es:" +
              contraseñaDefinitiva,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        //?se hashea la contraseña nueva
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(contraseñaDefinitiva, salt);
        //? se actializa la contraseña por la que ya se avia creado antes
        db.get(
          "UPDATE registro SET contraseña = $contraseña WHERE correo=$correo",
          {
            $contraseña: hash,
            $correo: correo,
          },
          (error) => {
            if (!error) {
              return console.log("update OK");
            }
          }
        );
      }
    }
  );
});


server.post("/cambiar", (req, res) => {
  let correo = req.body.correo;
  let codigo = req.body.codigoContraseña;
  let contraseñaNueva = req.body.contraseñaNueva;

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(contraseñaNueva, salt);
  db.get(
    "SELECT contraseña FROM registro WHERE correo=$correo",
    {
      $correo: correo,
    },
    (error, rows) => {
      if (!error) {
        if (bcrypt.compareSync(codigo, rows.contraseña)) {
          db.get(
            "UPDATE registro SET contraseña=$contraseña WHERE correo=$correo",
            {
              $contraseña: hash,
              $correo: correo,
            },
            (error) => {
              if (!error) {
                return res.render("principal");
                console.log("UPDATE OK");
              }
            }
          );
        }
      }
    }
  );
});



server.get("/comprar", (req, res) => {

  res.render("comprar")
})

server.post("/comprandoTiquete", async (req, res) => {
  let fecha = req.body.fecha;
  res.send("fecha");
})

server.listen(port, () => {
  console.log(`Su puerto es  ${port}`);
});

/*
-------------------------------------------------------------------------------
*/

function random() {
  let rangoContraseña = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let contraseña = "";
  let controlador = 6;
  for (let i = 0; i < controlador; i++) {
    contraseña += rangoContraseña[Math.floor(Math.random() * 10)];
  }
  return contraseña;
}

let keys = {
  public: "pk_test_51LVHhtJqwXpikLDT6RNHgqBeZXhvcdlDGDzP0yIINeObT7O53DGHFHgkSvXOMhPqaIq1lQr66fUcb9frmz1LRXyB00ViFE36IL",
  secret: "sk_test_51LVHhtJqwXpikLDTcXdoFKWZdrGnhFUIaJuRKyNpcsZJLUmmt3if2wkzWI5xrjAeJ3VAyEw7Ja0VA9hWMEfPIKET00IjVxWO7G"
}