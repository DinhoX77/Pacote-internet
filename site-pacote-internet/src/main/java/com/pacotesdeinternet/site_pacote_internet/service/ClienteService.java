package com.pacotesdeinternet.site_pacote_internet.service;

import com.pacotesdeinternet.site_pacote_internet.model.Cliente;
import com.pacotesdeinternet.site_pacote_internet.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public Cliente cadastrarCliente(Cliente cliente) {
        // Verificando duplicidade de CPF (exemplo de validação)
        Optional<Cliente> clienteExistente = clienteRepository.findByCpf(cliente.getCpf());
        if (clienteExistente.isPresent()) {
            throw new IllegalArgumentException("Já existe um cliente com o CPF fornecido.");
        }

        // Caso a validação passe, o cliente é salvo
        return clienteRepository.save(cliente);
    }

    public List<Cliente> listarClientes() {
        return clienteRepository.findAll();
    }

    public Cliente salvar(Cliente cliente) {
        // Salvar o cliente no banco de dados
        return clienteRepository.save(cliente);
    }


}
