document.getElementById('form-cliente').addEventListener('submit', function(event) {
  event.preventDefault();

  // Obtendo os dados dos campos
  const nome = document.getElementById('nome').value;
  const cpf = document.getElementById('cpf').value;
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;
  const cep = document.getElementById('cep').value;
  const cidade = document.getElementById('cidade').value;
  const bairro = document.getElementById('bairro').value;
  const rua = document.getElementById('rua').value;
  const numero = document.getElementById('numero').value;
  const complemento = document.getElementById('complemento').value;
  const pontoReferencia = document.getElementById('ponto_referencia').value;
  const tipoImovel = document.getElementById('tipo_imovel').value;
  const plano = document.getElementById('plano').value;

  // Criando um objeto com os dados do cliente
  const cliente = {
    nome: nome,
    cpf: cpf,
    email: email,
    telefone: telefone,
    endereco: {
      cep: cep,
      cidade: cidade,
      bairro: bairro,
      rua: rua,
      numero: numero,
      complemento: complemento,
      pontoReferencia: pontoReferencia,
      tipoImovel: tipoImovel
    },
    plano: plano
  };

  // Enviando a requisição POST para o backend
  fetch('/clientes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cliente)
  })
  .then(response => response.json())
  .then(data => {
    // Adicionando o novo cliente na tabela
    const tableBody = document.getElementById('clientes-list');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${data.nome}</td>
      <td>${data.cpf}</td>
      <td>${data.email}</td>
      <td>${data.telefone}</td>
      <td>
        <ul>
          <li>CEP: ${data.endereco.cep}</li>
          <li>Cidade: ${data.endereco.cidade}</li>
          <li>Bairro: ${data.endereco.bairro}</li>
          <li>Rua: ${data.endereco.rua}</li>
          <li>Número: ${data.endereco.numero}</li>
          <li>Complemento: ${data.endereco.complemento}</li>
          <li>Ponto de Referência: ${data.endereco.pontoReferencia}</li>
          <li>Tipo de Imóvel: ${data.endereco.tipoImovel}</li>
        </ul>
      </td>
      <td>${data.plano}</td>
      <td>
        <button onclick="editarCliente(this)">Editar</button>
        <button onclick="excluirCliente(this)">Excluir</button>
      </td>
    `;
    tableBody.appendChild(newRow);
    fecharModal(); // Fechar o modal após salvar
  })
  .catch(error => console.error('Erro ao adicionar cliente:', error));
});
