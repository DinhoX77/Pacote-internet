// Inicialização do mapa (com Leaflet)
let mapa = L.map('mapa').setView([-23.55052, -46.633308], 13); // Centralizado em São Paulo
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapa);

// Variável global para o marcador
let marcador;

// Função para criar ou atualizar o marcador
function criarMarcador(lat, lon) {
    // Se houver um marcador existente, remova-o
    if (marcador) {
        mapa.removeLayer(marcador);
    }

    // Adicionar o marcador no mapa
    marcador = L.marker([lat, lon]).addTo(mapa);
}

// Abrir o popup ao clicar no botão
document.getElementById('verificarBtn').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('popupCep').style.display = 'flex'; // Exibir o popup

    // Garantir que o mapa seja redimensionado corretamente após o popup ser exibido
    mapa.invalidateSize();  // Redimensiona o mapa

    // Adicionar o marcador e centralizar o mapa na localização padrão (São Paulo)
    criarMarcador(-23.55052, -46.633308);  // Posição padrão em São Paulo
});

// Fechar o popup ao clicar no "x"
document.getElementById('fecharPopup').addEventListener('click', function() {
    document.getElementById('popupCep').style.display = 'none'; // Fechar o popup
});

// Fechar o popup ao clicar fora do conteúdo do popup
window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('popupCep')) {
        document.getElementById('popupCep').style.display = 'none'; // Fechar o popup
    }
});

// Função para buscar o endereço via API ViaCEP
document.getElementById('formCep').addEventListener('submit', function(event) {
    event.preventDefault();
    let cep = document.getElementById('cep').value.replace('-', '').trim();

    // Validação do formato do CEP (aceita formatos como 12345-678 ou 12345678)
    const cepRegex = /^\d{5}-\d{3}$|^\d{8}$/;
    if (!cepRegex.test(cep)) {
        alert('Por favor, insira um CEP válido.');
        return;
    }

    // Fetch para a API ViaCEP
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado');
            } else {
                // Definir o endereço completo
                const endereco = `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}`;

                // Usar Nominatim para buscar as coordenadas a partir do endereço completo
                const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}&addressdetails=1`;

                // Busca as coordenadas do endereço no OpenStreetMap
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        if (data.length > 0) {
                            // Obter as coordenadas do primeiro resultado
                            const lat = parseFloat(data[0].lat);
                            const lon = parseFloat(data[0].lon);

                            // Atualizar o mapa e o marcador
                            mapa.setView([lat, lon], 16); // Centraliza o mapa no novo local com zoom 16
                            criarMarcador(lat, lon); // Atualiza o marcador
                        } else {
                            alert('Localização não encontrada para o CEP fornecido.');
                        }
                    })
                    .catch(error => {
                        console.error('Erro ao buscar coordenadas:', error);
                        alert('Erro ao buscar coordenadas.');
                    });
            }
        })
        .catch(error => {
            console.error('Erro ao buscar o CEP:', error);
            alert('Erro ao buscar o CEP.');
        });
});
