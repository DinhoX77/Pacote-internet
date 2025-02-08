// Função para buscar planos e preencher a tabela
function fetchPlans() {
    fetch('/planos')
    .then(response => response.json())
    .then(data => {
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
    fetch(`/planos/${planId}`)
    .then(response => response.json())
    .then(plan => {
        if (plan) {
            document.getElementById('modal-title').textContent = 'Editar Plano';
            document.getElementById('plan-name').value = plan.nome;
            document.getElementById('plan-speed').value = plan.velocidade;
            document.getElementById('plan-price').value = plan.preco.toFixed(2);
            document.getElementById('plan-id').value = plan.id;
            document.getElementById('plan-modal').style.display = 'block';
        } else {
            alert('Plano não encontrado.');
        }
    }).catch(error => console.error('Erro ao carregar plano para edição:', error));
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
        preco: parseFloat(document.getElementById('plan-price').value.replace('R$', '').replace(',', '.'))
    };

    if (planId) {
        // Editando um plano existente
        fetch(`/planos/${planId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(planData)
        })
        .then(() => fetchPlans())
        .catch(error => console.error('Erro ao editar o plano:', error));
    } else {
        // Adicionando novo plano
        fetch('/planos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(planData)
        })
        .then(() => fetchPlans())
        .catch(error => console.error('Erro ao adicionar o plano:', error));
    }

    closeModal(); // Fecha o modal
});

// Função para excluir um plano
function deletePlan(planId) {
    if (confirm('Tem certeza que deseja excluir este plano?')) {
        fetch(`/planos/${planId}`, {
            method: 'DELETE'
        })
        .then(() => fetchPlans())
        .catch(error => console.error('Erro ao excluir o plano:', error));
    }
}

// Função para aplicar máscara ao campo de preço
function applyPriceMask() {
    const priceInput = document.getElementById('plan-price');
    priceInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        value = (value / 100).toFixed(2) + ''; // Formata como número decimal
        value = value.replace('.', ','); // Substitui o ponto por vírgula
        this.value = 'R$ ' + value; // Adiciona o prefixo "R$"
    });
}

// Aplicar a máscara quando o modal for aberto
document.getElementById('plan-price').addEventListener('focus', applyPriceMask);
