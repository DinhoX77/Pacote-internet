// Função que carrega os planos do banco de dados e preenche o select
function carregarPlanos() {
    fetch("/planos")  // Faz uma requisição GET ao endpoint que retorna os planos
        .then(response => response.json())  // Converte a resposta para JSON
        .then(planos => {
            const planoSelect = document.getElementById("plano");

            // Remove opções antigas (se houver)
            planoSelect.innerHTML = "";

            // Adiciona uma opção padrão
            planoSelect.innerHTML = "<option value=''>Selecione um Plano</option>";

            // Preenche o select com os planos recebidos do banco de dados
            planos.forEach(plano => {
                const option = document.createElement("option");
                option.value = plano.id;  // Define o ID do plano como valor
                option.textContent = `${plano.nome} - R$ ${plano.preco}`;  // Exibe o nome e preço
                planoSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Erro ao carregar planos:", error));
}

// Função que envia os dados do cliente para o back-end
function cadastrarCliente(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    // Obtendo os dados do formulário
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
        plano: { id: document.getElementById("plano").value }  // Envia o ID do plano selecionado
    };

    // Enviar os dados para o back-end como JSON
    fetch('/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sucesso:', data);
        // Ações após o sucesso, como redirecionar ou mostrar uma mensagem
        alert('Cliente cadastrado com sucesso!');
    })
    .catch((error) => {
        console.error('Erro ao cadastrar cliente:', error);
    });
}

// Chama a função para carregar os planos ao carregar a página
window.onload = function() {
    carregarPlanos();

    // Atrelar a função de cadastrar cliente ao evento de submit do formulário
    document.querySelector('form').addEventListener('submit', cadastrarCliente);
};
