// Mostra o popup quando o botão for clicado
document.getElementById('abrirPopup').addEventListener('click', function () {
    document.getElementById('popupCep').style.display = 'flex';

    // Aguarda um pequeno atraso para garantir que o popup esteja visível
    setTimeout(function() {
        mapaSimulacao.invalidateSize(); // Redimensiona o mapa para se ajustar ao container visível
    }, 300); // 300ms para garantir que o popup tenha tempo de aparecer
});

// Fecha o popup quando o botão de fechar for clicado
document.getElementById('fecharPopup').addEventListener('click', function () {
    document.getElementById('popupCep').style.display = 'none';
});

// Fecha o popup ao clicar fora do conteúdo
window.addEventListener('click', function (event) {
    const popup = document.getElementById('popupCep');
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});

// Mapa com OpenStreetMap e Leaflet
let mapaSimulacao;
let marker;

function initMap() {
    // Inicializa o mapa com São Paulo como posição inicial
    mapaSimulacao = L.map('mapa').setView([-23.5505, -46.6333], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data © OpenStreetMap contributors'
    }).addTo(mapaSimulacao);

    // Adiciona um marcador inicial em São Paulo
    marker = L.marker([-23.5505, -46.6333]).addTo(mapaSimulacao);
}

// Inicia o mapa no carregamento da página
window.onload = initMap;

// Função para buscar endereço por CEP e atualizar o mapa
function buscarEndereco() {
    const cep = document.getElementById('cepPopup').value.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Só prosseguir se o CEP tiver 8 dígitos
    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    // Atualiza o mapa com base no endereço
                    atualizarMapa(data.logradouro, data.localidade);
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

// Função para atualizar o mapa com base no endereço
function atualizarMapa(logradouro, cidade, numero = '') {
    let enderecoCompleto = logradouro;
    if (numero) {
        enderecoCompleto += `, ${numero}`; // Adiciona o número ao endereço
    }

    const urlNominatim = `https://nominatim.openstreetmap.org/search?format=json` +
        `&street=${encodeURIComponent(enderecoCompleto)}` +
        `&city=${encodeURIComponent(cidade)}` +
        `&state=São+Paulo` +
        `&country=Brazil`;

    fetch(urlNominatim)
        .then(response => response.json())
        .then(location => {
            if (location.length > 0) {
                const lat = location[0].lat;
                const lon = location[0].lon;

                // Atualiza o mapa com a nova localização
                mapaSimulacao.setView([lat, lon], 15); // Zoom na nova localização

                // Remove o marcador anterior, se existir
                if (marker) {
                    mapaSimulacao.removeLayer(marker);
                }

                // Adiciona um novo marcador para a nova localização
                marker = L.marker([lat, lon]).addTo(mapaSimulacao);
            } else {
                alert('Local não encontrado.');
            }
        })
        .catch(error => {
            console.error('Erro ao buscar coordenadas:', error);
            alert('Erro ao buscar coordenadas.');
        });
}

// Associa o evento de busca ao envio do formulário do popup
document.getElementById('formCep').addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio do formulário
    buscarEndereco(); // Busca o endereço e atualiza o mapa
});
