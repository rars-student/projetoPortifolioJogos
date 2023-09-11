const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORTA = 3000;
const caminhoArquivoDados = "dados.json";

app.use(cors());

// Rota para obter todos os projetos
app.get("/projetos", (req, res) => {
  try {
    const dados = fs.readFileSync(caminhoArquivoDados, "utf-8");
    const projetos = JSON.parse(dados);
    res.json(projetos);
  } catch (erro) {
    res.status(500).json({ mensagem: "Falha ao ler o arquivo de dados." });
  }
});

// Rota para criar um novo projeto
app.post("/projetos", (req, res) => {
  try {
    const dados = fs.readFileSync(caminhoArquivoDados, "utf-8");
    const projetos = JSON.parse(dados);

    const novoProjeto = req.body;
    projetos.push(novoProjeto);

    fs.writeFileSync(caminhoArquivoDados, JSON.stringify(projetos, null, 2));

    res.status(201).json(novoProjeto);
  } catch (erro) {
    res.status(500).json({ mensagem: "Falha ao criar um novo projeto." });
  }
});

app.listen(PORTA, () => {
  console.log(`Rodando no link http://localhost:${PORTA}`);
});
