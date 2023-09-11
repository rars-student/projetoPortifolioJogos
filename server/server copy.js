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
app.post("/projetos", express.json(), (req, res) => {
  try {
    const dados = fs.readFileSync(caminhoArquivoDados, "utf-8");
    const projetos = JSON.parse(dados);

    const novoProjeto = {
      id: (projetos.length + 1).toString(),
      nome: req.body.nome,
      descricao: req.body.descricao,
    };

    projetos.push(novoProjeto);
    fs.writeFileSync(caminhoArquivoDados, JSON.stringify(projetos, null, 2));

    res.status(201).json(novoProjeto);
  } catch (erro) {
    res.status(500).json({ mensagem: "Falha ao criar o projeto." });
  }
});

// Rota para atualizar um projeto existente
app.put("/projetos/:id", express.json(), (req, res) => {
  try {
    const dados = fs.readFileSync(caminhoArquivoDados, "utf-8");
    let projetos = JSON.parse(dados);

    const idProjeto = req.params.id;
    const indiceProjeto = projetos.findIndex(
      projeto => projeto.id === idProjeto
    );

    if (indiceProjeto === -1) {
      return res.status(404).json({ mensagem: "Projeto não encontrado." });
    }

    projetos[indiceProjeto] = {
      ...projetos[indiceProjeto],
      nome: req.body.nome || projetos[indiceProjeto].nome,
      descricao: req.body.descricao || projetos[indiceProjeto].descricao,
    };

    fs.writeFileSync(caminhoArquivoDados, JSON.stringify(projetos, null, 2));

    res.json(projetos[indiceProjeto]);
  } catch (erro) {
    res.status(500).json({ mensagem: "Falha ao atualizar o projeto." });
  }
});

// Rota para excluir um projeto
app.delete("/projetos/:id", (req, res) => {
  try {
    const dados = fs.readFileSync(caminhoArquivoDados, "utf-8");
    let projetos = JSON.parse(dados);

    const idProjeto = req.params.id;
    const indiceProjeto = projetos.findIndex(
      projeto => projeto.id === idProjeto
    );

    if (indiceProjeto === -1) {
      return res.status(404).json({ mensagem: "Projeto não encontrado." });
    }

    const projetoExcluido = projetos.splice(indiceProjeto, 1)[0];
    fs.writeFileSync(caminhoArquivoDados, JSON.stringify(projetos, null, 2));

    res.json(projetoExcluido);
  } catch (erro) {
    res.status(500).json({ mensagem: "Falha ao excluir o projeto." });
  }
});

app.listen(PORTA, () => {
  console.log(`Rodando no link http://localhost:${PORTA}`);
});
