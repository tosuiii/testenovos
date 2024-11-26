require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/send-email", (req, res) => {
  const {
    message
  } = req.body;

  axios
    .post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
      }
    )
    .then((response) => {
      res.status(200).json({ message: "Simulação feita com sucesso!" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ success: false });
    });
});

app.post("/send-contact-email", (req, res) => {
  const { name, email, message } = req.body;

  axios
    .post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: `Nome: ${name}\nE-mail: ${email}\nMensagem: ${message}`,
      }
    )
    .then(() => {
      res.status(200).json({ message: "Mensagem enviada com sucesso!" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ success: false });
    });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
