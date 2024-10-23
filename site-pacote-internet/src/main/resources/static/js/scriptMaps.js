// Mapa com OpenStreetMap e Leaflet
let mapaSimulacao;
let marker;

function initMap() {
    // Inicializa o mapa com São Paulo como posição inicial
    mapaSimulacao = L.map('mapa-simulacao').setView([-23.5505, -46.6333], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data © OpenStreetMap contributors'
    }).addTo(mapaSimulacao);

    // Adiciona um marcador inicial em São Paulo
    marker = L.marker([-23.5505, -46.6333]).addTo(mapaSimulacao);
}

window.onload = initMap;

// Função para buscar endereço por CEP e atualizar o mapa
function buscarEndereco() {
    const cep = document.getElementById('cep').value.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Só prosseguir se o CEP tiver 8 dígitos
    if (cep.length === 8) {
        // Primeira requisição: ViaCEP para preencher o formulário
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    // Preenche os campos do formulário com os dados do endereço
                    document.getElementById('rua').value = data.logradouro;
                    document.getElementById('bairro').value = data.bairro;
                    document.getElementById('cidade').value = data.localidade;

                    // Atualiza o mapa com base no endereço sem o número
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

// Função para atualizar o mapa com base no endereço completo (incluindo o número)
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

    // Usa o endereço para buscar as coordenadas no Nominatim
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

// Associa o evento "blur" ao campo de CEP para buscar o endereço apenas quando o campo perder o foco e tiver um CEP válido
document.getElementById('cep').addEventListener('blur', function() {
    const cep = document.getElementById('cep').value.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Só chamar a busca se o CEP tiver exatamente 8 dígitos
    if (cep.length === 8) {
        buscarEndereco();
    }
});

// Evento para atualizar o mapa quando o número do local for inserido
document.getElementById('numero').addEventListener('blur', function() {
    const logradouro = document.getElementById('rua').value;
    const cidade = document.getElementById('cidade').value;
    const numero = document.getElementById('numero').value;

    if (logradouro && cidade && numero) {
        // Atualiza o mapa com o endereço completo incluindo o número
        atualizarMapa(logradouro, cidade, numero);
    }
});
