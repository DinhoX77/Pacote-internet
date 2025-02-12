// Função para carregar os planos do banco de dados e preencher o select no formulário
function carregarPlanos() {
    const urlParams = new URLSearchParams(window.location.search);
    const planoId = urlParams.get('id');

    fetch("/planos")  // Faz uma requisição GET para buscar os planos
        .then(response => response.json())  // Converte a resposta para JSON
        .then(planos => {
            const planoSelect = document.getElementById("plano");
            planoSelect.innerHTML = "<option value=''>Selecione um Plano</option>";

            // Adiciona os planos recebidos ao select
            planos.forEach(plano => {
                const option = document.createElement("option");
                option.value = plano.id;
                option.textContent = `${plano.nome} - R$ ${plano.preco.toFixed(2).replace('.', ',')}`;

                if (plano.id == planoId) {
                    option.selected = true;
                }

                planoSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Erro ao carregar planos:", error));
}

// Função para cadastrar o cliente no banco de dados
function cadastrarCliente(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os dados preenchidos no formulário
    const cliente = {
        nome: document.getElementById("nome").value.trim(),
        cpf: document.getElementById("cpf").value.trim(),
        email: document.getElementById("email").value.trim(),
        telefone: document.getElementById("telefone").value.trim(),
        cep: document.getElementById("cep").value.trim(),
        cidade: document.getElementById("cidade").value.trim(),
        bairro: document.getElementById("bairro").value.trim(),
        rua: document.getElementById("rua").value.trim(),
        numero: document.getElementById("numero").value.trim(),
        complemento: document.getElementById("complemento").value.trim(),
        pontoReferencia: document.getElementById("ponto_referencia").value.trim(),
        tipoImovel: document.getElementById("tipo_imovel").value,
        plano: { id: document.getElementById("plano").value }
    };

    // Validação básica para plano
    if (!cliente.plano.id) {
        exibirAlerta("Por favor, selecione um plano.", "erro");
        return;
    }

    // Envia os dados do cliente para o back-end
    fetch('/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Cliente cadastrado com sucesso:', data);
        exibirAlerta('Cliente cadastrado com sucesso!', 'sucesso');  // Mostra alerta de sucesso
        document.getElementById("form-cadastro").reset();  // Limpa o formulário após o sucesso
    })
    .catch(error => {
        console.error('Erro ao cadastrar cliente:', error);
        exibirAlerta('Ocorreu um erro ao tentar cadastrar o cliente. Tente novamente.', 'erro');  // Mostra alerta de erro
    });
}

// Função para exibir o alerta tipo popup
function exibirAlerta(mensagem, tipo) {
    const alerta = document.createElement('div');
    alerta.className = 'alerta-popup';
    alerta.textContent = mensagem;

    // Define cor com base no tipo
    if (tipo === 'sucesso') {
        alerta.style.backgroundColor = '#4CAF50';  // Verde para sucesso
    } else if (tipo === 'erro') {
        alerta.style.backgroundColor = '#f44336';  // Vermelho para erro
    }

    // Adiciona o alerta ao corpo do documento
    document.body.appendChild(alerta);

    // Remove o alerta após 5 segundos
    setTimeout(() => {
        alerta.remove();
    }, 5000);
}

// Chama a função de carregar os planos ao carregar a página
window.onload = function() {
    carregarPlanos();  // Carrega os planos no select ao carregar a página
    document.getElementById('form-cadastro').addEventListener('submit', cadastrarCliente);  // Vincula o evento de submit ao formulário
};
