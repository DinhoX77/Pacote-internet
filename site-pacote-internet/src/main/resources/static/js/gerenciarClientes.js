let clienteIdEditando = null;

function carregarPlanos() {
    fetch("/planos")
        .then(response => response.json())
        .then(planos => {
            const planoSelect = document.getElementById("plano");
            planoSelect.innerHTML = "<option value=''>Selecione um Plano</option>";
            planos.forEach(plano => {
                const option = document.createElement("option");
                option.value = plano.id;
                option.textContent = `${plano.nome} - R$ ${plano.preco}`;
                planoSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Erro ao carregar planos:", error));
}

function listarClientes() {
    fetch("/clientes")
        .then(response => response.json())
        .then(clientes => {
            const tableBody = document.getElementById('clientes-list');
            tableBody.innerHTML = "";

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
                            <li>Tipo de Imóvel: ${cliente.tipoImovel || 'N/A'}</li>
                        </ul>
                    </td>
                    <td>${cliente.plano.nome}</td>
                    <td>${cliente.status}</td> <!-- Exibe o status -->
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

function salvarCliente(event) {
    event.preventDefault();

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

    const url = clienteIdEditando ? `/clientes/${clienteIdEditando}` : '/clientes';
    const method = clienteIdEditando ? 'PUT' : 'POST';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente)
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            alert(clienteIdEditando ? 'Cliente atualizado com sucesso!' : 'Cliente cadastrado com sucesso!');
            listarClientes();
            fecharModal();
            clienteIdEditando = null;
        } else {
            console.error('Erro ao salvar cliente');
        }
    })
    .catch(error => console.error('Erro ao salvar cliente:', error));
}

function editarCliente(id) {
    fetch(`/clientes/${id}`)
        .then(response => response.json())
        .then(cliente => {
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

            clienteIdEditando = cliente.id;
            abrirModalAdicionar();
        })
        .catch(error => console.error('Erro ao editar cliente:', error));
}

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

function abrirModalAdicionar() {
    document.getElementById('modal-cliente').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modal-cliente').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    listarClientes();
    carregarPlanos();  // Carregar os planos ao abrir a página
    aplicarMascaras(); // Aplicar máscaras nos campos
});

document.getElementById('form-cliente').addEventListener('submit', salvarCliente);

function aplicarMascaras() {
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function (e) {
            e.target.value = formatCPF(e.target.value);
        });
    }

    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function (e) {
            e.target.value = formatTelefone(e.target.value);
        });
    }

    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('input', function (e) {
            e.target.value = formatCEP(e.target.value);
        });
    }
}

function formatCPF(value) {
    return value.replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{2})$/, '$1-$2');
}

function formatTelefone(value) {
    return value.replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
}

function formatCEP(value) {
    return value.replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2');
}

function aplicarMascaras() {
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function (e) {
            e.target.value = formatCPF(e.target.value).slice(0, 14);
        });
    }

    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function (e) {
            e.target.value = formatTelefone(e.target.value).slice(0, 15);
        });
    }

    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('input', function (e) {
            e.target.value = formatCEP(e.target.value).slice(0, 9);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    aplicarMascaras();
});

function buscarEndereco() {
    const cep = document.getElementById('cep').value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('rua').value = data.logradouro;
                    document.getElementById('bairro').value = data.bairro;
                    document.getElementById('cidade').value = data.localidade;
                } else {
                    alert('CEP não encontrado.');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar CEP:', error);
                alert('Erro ao buscar CEP.');
            });
    }
}


document.getElementById('cep').addEventListener('blur', buscarEndereco);