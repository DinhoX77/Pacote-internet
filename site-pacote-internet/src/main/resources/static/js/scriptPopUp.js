document.addEventListener('DOMContentLoaded', function() {
    // Mapa com OpenStreetMap e Leaflet
    let mapaSimulacao;
    let marker;

    function initMap() {
        // Inicializa o mapa com a localização correta da Av. Hamilton, Guarapiranga
        mapaSimulacao = L.map('mapa').setView([-23.5505, -46.6333], 15); // Coordenadas ajustadas

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map data © OpenStreetMap contributors'
        }).addTo(mapaSimulacao);

        // Adiciona um marcador inicial na Av. Hamilton
        marker = L.marker([-23.5505, -46.6333]).addTo(mapaSimulacao);
    }

    // Inicializa o mapa quando o popup for aberto
    document.getElementById('abrirPopup').addEventListener('click', function () {
        document.getElementById('popupCep').style.display = 'flex';
        setTimeout(function() {
            initMap(); // Inicializa o mapa no popup
            mapaSimulacao.invalidateSize(); // Garante que o mapa seja redimensionado corretamente
        }, 300);
    });

    // Fecha o popup quando o botão de fechar for clicado
    document.getElementById('fecharPopup').addEventListener('click', function () {
        document.getElementById('popupCep').style.display = 'none';
    });

    // Função para buscar endereço por CEP e atualizar o mapa
    function buscarEndereco() {
        const cepInput = document.getElementById('cepPopup'); // ID correto para o CEP no popup
        const mensagem = document.getElementById('mensagem'); // Elemento para exibir a mensagem
        if (cepInput) {  // Verifica se o input existe
            const cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

            if (cep.length === 8) { // Só prosseguir se o CEP tiver 8 dígitos
                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(response => response.json())
                    .then(data => {
                        if (!data.erro) {
                            // Exibe a mensagem
                            mensagem.textContent = 'Entre em contato para verificar se atendemos sua região.';
                            atualizarMapa(data.logradouro, data.localidade);
                        } else {
                            mensagem.textContent = 'CEP não encontrado.';
                        }
                    })
                    .catch(error => {
                        console.error('Erro ao buscar CEP:', error);
                        mensagem.textContent = 'Erro ao buscar CEP.';
                    });
            } else {
                mensagem.textContent = 'CEP inválido. Insira um CEP com 8 dígitos.';
            }
        } else {
            console.error('Elemento CEP não encontrado.');
        }
    }

    // Função para atualizar o mapa com base no endereço completo
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
                    document.getElementById('mensagem').textContent = 'Local não encontrado.';
                }
            })
            .catch(error => {
                console.error('Erro ao buscar coordenadas:', error);
                document.getElementById('mensagem').textContent = 'Erro ao buscar coordenadas.';
            });
    }

    // Associa o evento de clique no botão de buscar
    document.getElementById('formCep').addEventListener('submit', function(e) {
        e.preventDefault(); // Evita o comportamento padrão de enviar o formulário
        buscarEndereco(); // Busca o endereço e atualiza o mapa
    });

    // Formatação de CEP
    const cepInput = document.getElementById('cepPopup'); // ID correto do campo de CEP no popup
    if (cepInput) {
        cepInput.addEventListener('input', function(e) {
            e.target.value = formatCEP(e.target.value); // Formata o CEP
        });
    }

    // Função para formatar o CEP (#####-###)
    function formatCEP(value) {
        return value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2');
    }
});
