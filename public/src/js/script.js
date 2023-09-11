// Função para abrir o WhatsApp
const abrirWhatsapp = () => {
  let number = "5521982612819"; // substitua pelo número no formato internacional (ativo no WhatsApp)
  let msg = document.getElementById("msg").value; // obtém o texto do campo de mensagem

  // montar o link (número e texto) (web)
  let target = `https://api.whatsapp.com/send?phone=${encodeURIComponent(
    number
  )}&text=${encodeURIComponent(msg)}`;

  // abre o link no WhatsApp (web)
  window.open(target);
};

// Carregar projetos via Fetch
const tabelaProjetos = document
  .getElementById("tabela-projetos")
  .getElementsByTagName("tbody")[0];

fetch("http://localhost:3000/projetos") // Deve corresponder à sua rota
  .then(response => response.json())
  .then(projetos => {
    projetos.forEach(projeto => {
      const linha = document.createElement("tr");
      linha.innerHTML = `
              <td>${projeto.id}</td>
              <td><img src="${projeto.imagem}"></td>
              <td>${projeto.nome}</td>
              <td>${projeto.descricao}</td>
              <td><a href="${projeto.link}" target="_blank">${projeto.link}</a></td>
          `;
      tabelaProjetos.appendChild(linha);
    });
  })
  .catch(error => {
    console.error("Erro ao buscar projetos:", error);
  });
