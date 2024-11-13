document.addEventListener('DOMContentLoaded', function() {
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

    initMap();

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

    // Associa o evento "blur" ao campo de CEP para buscar o endereço
    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('blur', function() {
            const cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

            // Só chamar a busca se o CEP tiver exatamente 8 dígitos
            if (cep.length === 8) {
                buscarEndereco();
            }
        });
    }

    // Evento para atualizar o mapa quando o número do local for inserido
    const numeroInput = document.getElementById('numero');
    if (numeroInput) {
        numeroInput.addEventListener('blur', function() {
            const logradouro = document.getElementById('rua').value;
            const cidade = document.getElementById('cidade').value;
            const numero = numeroInput.value;

            if (logradouro && cidade && numero) {
                // Atualiza o mapa com o endereço completo incluindo o número
                atualizarMapa(logradouro, cidade, numero);
            }
        });
    }

    // Event listeners para formatação de campos
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            e.target.value = formatCPF(e.target.value);
        });
    }

    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            e.target.value = formatTelefone(e.target.value);
        });
    }

    const cepInputFormat = document.getElementById('cep');
    if (cepInputFormat) {
        cepInputFormat.addEventListener('input', function(e) {
            e.target.value = formatCEP(e.target.value);
        });
    }

    const cadastroForm = document.getElementById('cadastroForm');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário
            const form = event.target;
            const formData = new FormData(form);
            const jsonData = {};

            formData.forEach((value, key) => {
                jsonData[key] = value;
            });

            fetch('/clientes/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            })
            .then(response => {
                if (response.ok) {
                    alert('Cliente cadastrado com sucesso!');
                    form.reset(); // Limpa o formulário após o sucesso
                } else {
                    return response.json().then(data => {
                        throw new Error(data.message || 'Ocorreu um erro no cadastro.');
                    });
                }
            })
            .catch(error => {
                console.error('Erro ao cadastrar cliente:', error);
                alert('Erro ao cadastrar cliente: ' + error.message);
            });
        });
    }

    // Função de formatação de CPF, Telefone e CEP
    function formatCPF(value) {
        return value.replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{2})$/, '$1-$2');
    }

    function formatTelefone(value) {
        return value.replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2');
    }

    function formatCEP(value) {
        return value.replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2');
    }
});
