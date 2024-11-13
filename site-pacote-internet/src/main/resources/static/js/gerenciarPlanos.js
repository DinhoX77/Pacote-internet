// Função para buscar planos e preencher a tabela
function fetchPlans() {
    fetch('/api/planos') // O endpoint que retorna os planos
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('plans-body');
            tableBody.innerHTML = ''; // Limpa a tabela antes de adicionar os planos

            data.forEach(plan => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${plan.nome}</td>
                    <td>${plan.velocidade}</td>
                    <td>${plan.preco}</td>
                    <td>
                        <button onclick="editPlan(${plan.id})">Editar</button>
                        <button onclick="deletePlan(${plan.id})">Excluir</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Erro ao carregar planos:', error));
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
    fetch(`/api/planos/${planId}`) // Endpoint para buscar um plano específico
        .then(response => response.json())
        .then(plan => {
            document.getElementById('modal-title').textContent = 'Editar Plano';
            document.getElementById('plan-name').value = plan.nome;
            document.getElementById('plan-speed').value = plan.velocidade;
            document.getElementById('plan-price').value = plan.preco;
            document.getElementById('plan-id').value = plan.id;
            document.getElementById('plan-modal').style.display = 'block';
        })
        .catch(error => console.error('Erro ao carregar plano:', error));
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
        velocidade: document.getElementById('plan-speed').value,
        preco: document.getElementById('plan-price').value
    };

    let method = 'POST'; // O método padrão é POST (para criar um novo plano)
    let url = '/api/planos'; // O endpoint para criar um novo plano

    // Se existir um ID, estamos editando um plano existente
    if (planId) {
        method = 'PUT';
        url = `/api/planos/${planId}`;
    }

    // Enviar os dados do plano para o backend
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(planData)
    })
    .then(response => {
        if (response.ok) {
            fetchPlans(); // Atualiza a lista de planos
            closeModal(); // Fecha o modal
        } else {
            alert('Erro ao salvar plano');
        }
    })
    .catch(error => console.error('Erro ao salvar plano:', error));
});


// Função para excluir um plano
function deletePlan(planId) {
    if (confirm('Tem certeza que deseja excluir este plano?')) {
        fetch(`/api/planos/${planId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                fetchPlans(); // Atualiza a lista de planos
            } else {
                alert('Erro ao excluir plano');
            }
        })
        .catch(error => console.error('Erro ao excluir plano:', error));
    }
}
