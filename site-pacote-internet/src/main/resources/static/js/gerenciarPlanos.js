// Simulando dados de planos para teste enquanto o backend não está pronto
const planos = [
    { id: 1, nome: 'Plano 100Mb', velocidade: 100, preco: 99.90 },
    { id: 2, nome: 'Plano 200Mb', velocidade: 200, preco: 149.90 },
    { id: 3, nome: 'Plano 300Mb', velocidade: 300, preco: 199.90 }
];

// Função para buscar planos e preencher a tabela
function fetchPlans() {
    // Simulando a resposta da API com um delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(planos);
        }, 500);
    }).then(data => {
        const tableBody = document.getElementById('plans-body');
        tableBody.innerHTML = ''; // Limpa a tabela antes de adicionar os planos

        data.forEach(plan => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${plan.nome}</td>
                <td>${plan.velocidade} Mbps</td>
                <td>R$ ${plan.preco.toFixed(2)}</td>
                <td>
                    <button onclick="editPlan(${plan.id})">Editar</button>
                    <button onclick="deletePlan(${plan.id})">Excluir</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }).catch(error => console.error('Erro ao carregar planos:', error));
}

// Chama a função para preencher os planos assim que a página carregar
window.onload = function() {
    fetchPlans();
};

// Função para abrir o modal para adicionar novo plano
function openAddPlanModal() {
    document.getElementById('modal-title').textContent = 'Adicionar Novo Plano';
    document.getElementById('plan-form').reset(); // Limpa o formulário
    document.getElementById('plan-id').value = ''; // Reseta o ID do plano
    document.getElementById('plan-modal').style.display = 'block';
}

// Função para abrir o modal com os dados do plano para editar
function editPlan(planId) {
    const plan = planos.find(p => p.id === planId);
    if (plan) {
        document.getElementById('modal-title').textContent = 'Editar Plano';
        document.getElementById('plan-name').value = plan.nome;
        document.getElementById('plan-speed').value = plan.velocidade;
        document.getElementById('plan-price').value = plan.preco;
        document.getElementById('plan-id').value = plan.id;
        document.getElementById('plan-modal').style.display = 'block';
    } else {
        alert('Plano não encontrado.');
    }
}

// Função para fechar o modal
function closeModal() {
    document.getElementById('plan-modal').style.display = 'none';
}

// Função para adicionar ou editar um plano
document.getElementById('plan-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const planId = document.getElementById('plan-id').value;
    const planData = {
        nome: document.getElementById('plan-name').value,
        velocidade: Number(document.getElementById('plan-speed').value),
        preco: Number(document.getElementById('plan-price').value)
    };

    if (planId) {
        // Editando um plano existente
        const planIndex = planos.findIndex(p => p.id == planId);
        if (planIndex > -1) {
            planos[planIndex] = { ...planos[planIndex], ...planData };
        }
    } else {
        // Adicionando novo plano
        planData.id = planos.length + 1; // Gerando um ID fictício
        planos.push(planData);
    }

    fetchPlans(); // Atualiza a lista de planos
    closeModal(); // Fecha o modal
});

// Função para excluir um plano
function deletePlan(planId) {
    if (confirm('Tem certeza que deseja excluir este plano?')) {
        const planIndex = planos.findIndex(p => p.id === planId);
        if (planIndex > -1) {
            planos.splice(planIndex, 1); // Remove o plano da lista
        }
        fetchPlans(); // Atualiza a lista de planos
    }
}
