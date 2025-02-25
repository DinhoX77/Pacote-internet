// Função que carrega os planos do banco de dados e preenche o select
function carregarPlanos() {
    fetch("/planos")
        .then(response => response.json())
        .then(planos => {
            const planoSelect = document.getElementById("plano");
            planoSelect.innerHTML = "<option value=''>Selecione um Plano</option>"; // Adiciona uma opção padrão
            planos.forEach(plano => {
                const option = document.createElement("option");
                option.value = plano.id;
                option.textContent = `${plano.nome} - R$ ${plano.preco}`;
                planoSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Erro ao carregar planos:", error));
}

// Função para listar todos os clientes e preencher a tabela
function listarClientes() {
    fetch("/clientes")
        .then(response => response.json())
        .then(clientes => {
            const tableBody = document.getElementById('clientes-list');
            tableBody.innerHTML = "";  // Limpar tabela antes de preencher

            clientes.forEach(cliente => {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${cliente.nome}</td>
                    <td>${cliente.cpf}</td>
                    <td>${cliente.email}</td>
                    <td>${cliente.telefone}</td>
                    <td>
                        <ul style="list-style: none; padding-left: 0;">
                            <li>Rua: ${cliente.rua}</li>
                            <li>Número: ${cliente.numero}</li>
                            <li>Bairro: ${cliente.bairro}</li>
                            <li>Cidade: ${cliente.cidade}</li>
                            <li>CEP: ${cliente.cep}</li>
                            <li>Complemento: ${cliente.complemento || 'N/A'}</li>
                            <li>Ponto de Referência: ${cliente.pontoReferencia || 'N/A'}</li>
                        </ul>
                    </td>
                    <td>${cliente.plano.nome}</td>
                    <td>${cliente.status}</td> <!-- Adicione esta linha para exibir o status -->
                    <td class="table-buttons">
                        <button onclick="editarCliente(${cliente.id})">Editar</button>
                        <button onclick="excluirCliente(${cliente.id})">Excluir</button>
                    </td>
                `;
                tableBody.appendChild(newRow);
            });
        })
        .catch(error => console.error('Erro ao listar clientes:', error));
}



// Função que envia os dados do cliente para o back-end (cadastrando ou atualizando)
function salvarCliente(event) {
    event.preventDefault();  // Impede o comportamento padrão do formulário

    const cliente = {
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        cep: document.getElementById("cep").value,
        cidade: document.getElementById("cidade").value,
        bairro: document.getElementById("bairro").value,
        rua: document.getElementById("rua").value,
        numero: document.getElementById("numero").value,
        complemento: document.getElementById("complemento").value,
        pontoReferencia: document.getElementById("ponto_referencia").value,
        tipoImovel: document.getElementById("tipo_imovel").value,
        plano: { id: document.getElementById("plano").value }
    };

    fetch('/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente)
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            alert('Cliente cadastrado com sucesso!');
            listarClientes();  // Atualizar a lista de clientes
            fecharModal();  // Fechar o modal após salvar
        } else {
            console.error('Erro ao cadastrar cliente');
        }
    })
    .catch(error => console.error('Erro ao cadastrar cliente:', error));
}

// Função para editar cliente
function editarCliente(id) {
    fetch(`/clientes/${id}`)
        .then(response => response.json())
        .then(cliente => {
            // Preenche o formulário com os dados do cliente para edição
            document.getElementById('nome').value = cliente.nome;
            document.getElementById('cpf').value = cliente.cpf;
            document.getElementById('email').value = cliente.email;
            document.getElementById('telefone').value = cliente.telefone;
            document.getElementById('cep').value = cliente.cep;
            document.getElementById('cidade').value = cliente.cidade;
            document.getElementById('bairro').value = cliente.bairro;
            document.getElementById('rua').value = cliente.rua;
            document.getElementById('numero').value = cliente.numero;
            document.getElementById('complemento').value = cliente.complemento;
            document.getElementById('ponto_referencia').value = cliente.pontoReferencia;
            document.getElementById('tipo_imovel').value = cliente.tipoImovel;
            document.getElementById('plano').value = cliente.plano.id;

            abrirModalAdicionar();  // Abre o modal para edição
        })
        .catch(error => console.error('Erro ao editar cliente:', error));
}

// Função para excluir cliente
function excluirCliente(id) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
        fetch(`/clientes/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            alert('Cliente excluído com sucesso!');
            listarClientes();  // Atualizar a lista de clientes
        })
        .catch(error => console.error('Erro ao excluir cliente:', error));
    }
}

// Funções para abrir e fechar o modal
function abrirModalAdicionar() {
    document.getElementById('modal-cliente').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modal-cliente').style.display = 'none';
}

// Listar clientes ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    listarClientes();
    carregarPlanos();  // Carregar os planos ao abrir a página
});

// Event listener para salvar cliente
document.getElementById('form-cliente').addEventListener('submit', salvarCliente);
