// Função para carregar os planos e exibir os cards dinamicamente
function carregarPlanos() {
    fetch('/planos')
        .then(response => response.json())
        .then(planos => {
            const container = document.getElementById('planos-container');
            container.innerHTML = '';  // Limpa o container antes de adicionar os novos planos

            planos.forEach(plano => {
                // Criando o card para cada plano
                const card = document.createElement('div');
                card.className = 'col-md-4 mb-4';

                card.innerHTML = `
                    <div class="card-plano">
                        <div class="card-cabecalho">
                            <div class="texto-velocidade">
                                <span class="numero">${plano.velocidade}</span>
                                <span class="unidade">MB</span>
                            </div>
                        </div>
                        <div class="card-preco-container">
                            <div class="texto-preco">Por Apenas</div>
                        </div>
                        <div class="card-descricao">
                            <div class="preco">
                                <span class="preco-simbolo">R$</span>
                                <span class="preco-valor">${plano.preco.toFixed(2)}</span>
                            </div>
                        </div>
                        <a href="cadastro.html">
                            <button class="botao-assinar">Assinar</button>
                        </a>
                    </div>
                `;

                container.appendChild(card);  // Adiciona o card ao container
            });
        })
        .catch(error => console.error('Erro ao carregar planos:', error));
}

// Carrega os planos quando a página for carregada
window.onload = carregarPlanos;
