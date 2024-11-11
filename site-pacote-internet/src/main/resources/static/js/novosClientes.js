document.addEventListener('DOMContentLoaded', () => {
  // Exemplo de dados simulados de clientes, incluindo o endereço
  const clientesNovos = [
    {
      nome: 'João Silva',
      cpf: '123.456.789-00',
      email: 'joao.silva@email.com',
      telefone: '(11) 98765-4321',
      plano: 'Plano 100Mb',
      endereco: {
        rua: 'Rua das Flores',
        numero: '123',
        bairro: 'Vila Nova',
        cidade: 'São Paulo',
        cep: '01000-000',
        latitude: -23.55052,
        longitude: -46.633308
      },
      aprovado: false,
    },
    {
      nome: 'Maria Souza',
      cpf: '987.654.321-00',
      email: 'maria.souza@email.com',
      telefone: '(11) 99876-5432',
      plano: 'Plano 200Mb',
      endereco: {
        rua: 'Avenida Paulista',
        numero: '456',
        bairro: 'Bela Vista',
        cidade: 'São Paulo',
        cep: '01310-000',
        latitude: -23.561684,
        longitude: -46.656478
      },
      aprovado: false,
    },
  ];

  // Função para exibir os clientes na tabela
  const mostrarClientes = () => {
    const listaClientes = document.getElementById('clientes-novos-list');
    listaClientes.innerHTML = ''; // Limpa a lista atual

    clientesNovos.forEach((cliente, index) => {
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${cliente.nome}</td>
        <td>${cliente.cpf}</td>
        <td>${cliente.email}</td>
        <td>${cliente.telefone}</td>
        <td>${cliente.plano}</td>
        <td>
          ${cliente.endereco.rua}, ${cliente.endereco.numero} - ${cliente.endereco.bairro}, ${cliente.endereco.cidade} - CEP: ${cliente.endereco.cep}
        </td>
        <td>
          <div id="map-${index}" class="mapa"></div>
        </td>
        <td>
          <select id="aprovacao-${index}" class="aprovacao">
            <option value="false" ${cliente.aprovado === false ? 'selected' : ''}>Rejeitar</option>
            <option value="true" ${cliente.aprovado === true ? 'selected' : ''}>Aprovar</option>
          </select>
        </td>
        <td>
          <button onclick="processarCliente(${index})">Salvar</button>
        </td>
      `;

      listaClientes.appendChild(tr);

      // Inicializa o mapa do cliente
      initMap(cliente.endereco.latitude, cliente.endereco.longitude, index);
    });
  };

  // Função para inicializar o mapa com a localização do cliente
  const initMap = (latitude, longitude, index) => {
    const map = L.map(`map-${index}`).setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map)
      .bindPopup('Localização do Cliente')
      .openPopup();
  };

  // Função para processar a aprovação ou rejeição do cliente
  window.processarCliente = (index) => {
    const selectAprovacao = document.getElementById(`aprovacao-${index}`);
    const aprovado = selectAprovacao.value === 'true';

    if (aprovado) {
      alert(`Cliente ${clientesNovos[index].nome} aprovado!`);
      // Lógica para salvar o cliente na lista de clientes
      // Aqui, vamos apenas remover da lista de novos clientes por enquanto
      clientesNovos.splice(index, 1);
    } else {
      alert(`Cliente ${clientesNovos[index].nome} rejeitado!`);
      // Lógica para rejeitar o cliente
      clientesNovos.splice(index, 1);
    }

    mostrarClientes(); // Atualiza a tabela
  };

  // Exibe os clientes ao carregar a página
  mostrarClientes();
});
