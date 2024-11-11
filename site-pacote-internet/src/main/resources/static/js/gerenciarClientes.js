// Função para abrir o modal de adicionar/editar cliente
function abrirModalAdicionar() {
  document.getElementById('modal-cliente').style.display = 'flex';
  limparFormulario(); // Limpar o formulário ao abrir o modal
}

// Função para fechar o modal
function fecharModal() {
  document.getElementById('modal-cliente').style.display = 'none';
}

// Função para limpar os campos do formulário
function limparFormulario() {
  const form = document.getElementById('form-cliente');
  form.reset(); // Reseta todos os campos do formulário
}

// Função para salvar os dados do cliente (temporário sem backend)
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

  // Criando uma nova linha na tabela com os dados do cliente
  const tableBody = document.getElementById('clientes-list');
  const newRow = document.createElement('tr');

  newRow.innerHTML = `
    <td>${nome}</td>
    <td>${cpf}</td>
    <td>${email}</td>
    <td>${telefone}</td>
    <td>
      <ul>
        <li>CEP: ${cep}</li>
        <li>Cidade: ${cidade}</li>
        <li>Bairro: ${bairro}</li>
        <li>Rua: ${rua}</li>
        <li>Número: ${numero}</li>
        <li>Complemento: ${complemento}</li>
        <li>Ponto de Referência: ${pontoReferencia}</li>
        <li>Tipo de Imóvel: ${tipoImovel}</li>
      </ul>
    </td>
    <td>${plano}</td>
    <td>
      <button onclick="editarCliente(this)">Editar</button>
      <button onclick="excluirCliente(this)">Excluir</button>
    </td>
  `;

  // Adicionando a nova linha à tabela
  tableBody.appendChild(newRow);

  // Fechando o modal após salvar
  fecharModal();
});

// Função para editar o cliente
function editarCliente(button) {
  const row = button.closest('tr');

  // Preenche o formulário com os dados da linha selecionada
  document.getElementById('nome').value = row.cells[0].innerText;
  document.getElementById('cpf').value = row.cells[1].innerText;
  document.getElementById('email').value = row.cells[2].innerText;
  document.getElementById('telefone').value = row.cells[3].innerText;

  const endereco = row.cells[4].querySelector('ul');
  document.getElementById('cep').value = endereco.children[0].innerText.replace('CEP: ', '');
  document.getElementById('cidade').value = endereco.children[1].innerText.replace('Cidade: ', '');
  document.getElementById('bairro').value = endereco.children[2].innerText.replace('Bairro: ', '');
  document.getElementById('rua').value = endereco.children[3].innerText.replace('Rua: ', '');
  document.getElementById('numero').value = endereco.children[4].innerText.replace('Número: ', '');
  document.getElementById('complemento').value = endereco.children[5].innerText.replace('Complemento: ', '');
  document.getElementById('ponto_referencia').value = endereco.children[6].innerText.replace('Ponto de Referência: ', '');
  document.getElementById('tipo_imovel').value = endereco.children[7].innerText.replace('Tipo de Imóvel: ', '');

  document.getElementById('plano').value = row.cells[5].innerText;

  // Muda o título do modal e a função de salvar
  document.querySelector('.modal-content h2').innerText = 'Editar Cliente';
  document.getElementById('form-cliente').removeEventListener('submit', salvarCliente);
  document.getElementById('form-cliente').addEventListener('submit', function(event) {
    event.preventDefault();
    atualizarCliente(row);
  });

  abrirModalAdicionar();
}

// Função para atualizar os dados do cliente
function atualizarCliente(row) {
  // Obtendo os dados atualizados do formulário
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

  // Atualizando a linha da tabela com os novos dados
  row.cells[0].innerText = nome;
  row.cells[1].innerText = cpf;
  row.cells[2].innerText = email;
  row.cells[3].innerText = telefone;

  const endereco = row.cells[4].querySelector('ul');
  endereco.children[0].innerText = `CEP: ${cep}`;
  endereco.children[1].innerText = `Cidade: ${cidade}`;
  endereco.children[2].innerText = `Bairro: ${bairro}`;
  endereco.children[3].innerText = `Rua: ${rua}`;
  endereco.children[4].innerText = `Número: ${numero}`;
  endereco.children[5].innerText = `Complemento: ${complemento}`;
  endereco.children[6].innerText = `Ponto de Referência: ${pontoReferencia}`;
  endereco.children[7].innerText = `Tipo de Imóvel: ${tipoImovel}`;

  row.cells[5].innerText = plano;

  // Fechando o modal após atualizar
  fecharModal();
}

// Função para excluir o cliente
function excluirCliente(button) {
  if (confirm('Deseja realmente excluir este cliente?')) {
    const row = button.closest('tr');
    row.remove();
  }
}
