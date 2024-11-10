// Simulação de dados de planos (utilizado apenas se os dados não forem carregados do backend)
let plans = [
    { id: 1, name: 'Plano Básico', speed: 10, price: 79.90 },
    { id: 2, name: 'Plano Intermediário', speed: 50, price: 149.90 },
    { id: 3, name: 'Plano Avançado', speed: 100, price: 199.90 }
];

// Função para renderizar os planos na tabela
function renderPlans() {
    const tbody = document.getElementById('plans-body');
    tbody.innerHTML = '';

    plans.forEach(plan => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${plan.name}</td>
            <td>${plan.speed} Mbps</td>
            <td>R$ ${plan.price}</td>
            <td>
                <button onclick="openEditPlanModal(${plan.id})">Editar</button>
                <button onclick="deletePlan(${plan.id})">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Função para abrir o modal de adicionar/editar plano
function openAddPlanModal() {
    document.getElementById('plan-modal').style.display = 'flex';
    document.getElementById('modal-title').innerText = 'Adicionar Novo Plano';
    document.getElementById('plan-form').reset();
    document.getElementById('plan-id').value = '';
}

// Função para abrir o modal de edição de plano
function openEditPlanModal(planId) {
    const plan = plans.find(p => p.id === planId);
    document.getElementById('plan-id').value = plan.id;
    document.getElementById('plan-name').value = plan.name;
    document.getElementById('plan-speed').value = plan.speed;
    document.getElementById('plan-price').value = plan.price;
    document.getElementById('modal-title').innerText = 'Editar Plano';

    document.getElementById('plan-modal').style.display = 'flex';
}

// Função para salvar o plano (novo ou editado)
function savePlan(event) {
    event.preventDefault();

    const planId = document.getElementById('plan-id').value;
    const name = document.getElementById('plan-name').value;
    const speed = document.getElementById('plan-speed').value;
    const price = document.getElementById('plan-price').value;

    const plan = { name, speed, price };

    if (planId) {
        // Editando plano existente
        fetch(`/plans/${planId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(plan)
        })
        .then(response => response.json())
        .then(() => {
            fetchPlans();  // Atualiza os planos após a edição
            closeModal();
        })
        .catch(error => console.error('Erro ao editar plano:', error));
    } else {
        // Adicionando novo plano
        fetch('/plans', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(plan)
        })
        .then(response => response.json())
        .then(() => {
            fetchPlans();  // Atualiza os planos após a adição
            closeModal();
        })
        .catch(error => console.error('Erro ao adicionar plano:', error));
    }
}

// Função para excluir plano
function deletePlan(planId) {
    if (confirm('Tem certeza que deseja excluir este plano?')) {
        fetch(`/plans/${planId}`, {
            method: 'DELETE'
        })
        .then(() => {
            fetchPlans();  // Atualiza os planos após a exclusão
        })
        .catch(error => console.error('Erro ao excluir plano:', error));
    }
}

// Função para fechar o modal
function closeModal() {
    document.getElementById('plan-modal').style.display = 'none';
}

// Função para buscar planos do backend
function fetchPlans() {
    fetch('/plans')
        .then(response => response.json())
        .then(data => {
            plans = data;
            renderPlans();
        })
        .catch(error => console.error('Erro ao carregar planos:', error));
}

// Carregar os planos na inicialização
window.onload = fetchPlans;

// Adicionar evento de submit para o formulário de plano
document.getElementById('plan-form').addEventListener('submit', savePlan);
