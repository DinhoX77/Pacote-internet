package com.pacotesdeinternet.site_pacote_internet.controller;

import com.pacotesdeinternet.site_pacote_internet.model.Cliente;
import com.pacotesdeinternet.site_pacote_internet.model.Endereco;
import com.pacotesdeinternet.site_pacote_internet.service.ClienteService;
import com.pacotesdeinternet.site_pacote_internet.service.EnderecoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private EnderecoService enderecoService;

    @PostMapping("/cadastro")
    public ResponseEntity<String> cadastrarClienteComEndereco(@RequestBody Cliente cliente) {
        try {
            // Salvar o cliente primeiro
            Cliente clienteSalvo = clienteService.salvar(cliente);

            // Salvar o endereço associado ao cliente, se fornecido
            if (cliente.getEndereco() != null) {
                Endereco endereco = cliente.getEndereco();
                endereco.setCliente(clienteSalvo);  // Associar o cliente ao endereço
                enderecoService.salvarEndereco(endereco);
            }

            return ResponseEntity.ok("Cliente e endereço cadastrados com sucesso!");
        } catch (Exception e) {
            // Tratar o erro e retornar uma resposta adequada
            return ResponseEntity.status(500).body("Erro ao cadastrar cliente e endereço: " + e.getMessage());
        }
    }
}
