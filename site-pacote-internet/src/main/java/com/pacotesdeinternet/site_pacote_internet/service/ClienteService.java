package com.pacotesdeinternet.site_pacote_internet.service;

import com.pacotesdeinternet.site_pacote_internet.model.Cliente;
import com.pacotesdeinternet.site_pacote_internet.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> listarClientes() {
        return clienteRepository.findAll();
    }

    public Cliente cadastrarCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public void deletarCliente(Long id) {
        clienteRepository.deleteById(id);
    }


}