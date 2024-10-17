package com.pacotesdeinternet.site_pacote_internet.controller;

import com.pacotesdeinternet.site_pacote_internet.model.Cliente;
import com.pacotesdeinternet.site_pacote_internet.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public List<Cliente> listarClientes() {
        return clienteService.listarClientes();
    }

    @PostMapping
    public Cliente cadastrarCliente(@RequestBody Cliente cliente) {
        return clienteService.cadastrarCliente(cliente);
    }

    @DeleteMapping("/{id}")
    public void deletarCliente(@PathVariable Long id) {
        clienteService.deletarCliente(id);
    }
}