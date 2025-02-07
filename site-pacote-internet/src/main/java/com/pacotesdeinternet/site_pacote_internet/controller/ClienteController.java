package com.pacotesdeinternet.site_pacote_internet.controller;

import com.pacotesdeinternet.site_pacote_internet.model.Cliente;
import com.pacotesdeinternet.site_pacote_internet.model.Plano;
import com.pacotesdeinternet.site_pacote_internet.service.ClienteService;
import com.pacotesdeinternet.site_pacote_internet.service.PlanoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private PlanoService planoService;

    // Listar todos os clientes
    @GetMapping
    public List<Cliente> listarTodos() {
        return clienteService.listarTodos();
    }

    // Buscar cliente por ID
    @GetMapping("/{id}")
    public ResponseEntity<Cliente> buscarPorId(@PathVariable Long id) {
        return clienteService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Criar um novo cliente
    @PostMapping
    public ResponseEntity<Cliente> salvar(@RequestBody Cliente cliente) {
        // Buscando o plano pelo ID fornecido no cliente
        Optional<Plano> plano = planoService.buscarPorId(cliente.getPlano().getId());
        if (plano.isPresent()) {
            cliente.setPlano(plano.get());  // Definindo o plano no cliente
            Cliente clienteSalvo = clienteService.salvar(cliente);
            return ResponseEntity.ok(clienteSalvo);  // Retornando o cliente salvo
        } else {
            // Retornar 404 se o plano não for encontrado
            return ResponseEntity.status(404).body(null);
        }
    }

    // Atualizar um cliente existente
    @PutMapping("/{id}")
    public ResponseEntity<Cliente> atualizar(@PathVariable Long id, @RequestBody Cliente clienteAtualizado) {
        Optional<Cliente> clienteExistente = clienteService.buscarPorId(id);
        if (clienteExistente.isPresent()) {
            Cliente cliente = clienteExistente.get();
            // Atualizar os dados do cliente
            cliente.setNome(clienteAtualizado.getNome());
            cliente.setCpf(clienteAtualizado.getCpf());
            cliente.setEmail(clienteAtualizado.getEmail());
            cliente.setTelefone(clienteAtualizado.getTelefone());
            cliente.setCep(clienteAtualizado.getCep());
            cliente.setCidade(clienteAtualizado.getCidade());
            cliente.setBairro(clienteAtualizado.getBairro());
            cliente.setRua(clienteAtualizado.getRua());
            cliente.setNumero(clienteAtualizado.getNumero());
            cliente.setComplemento(clienteAtualizado.getComplemento());
            cliente.setPontoReferencia(clienteAtualizado.getPontoReferencia());
            cliente.setTipoImovel(clienteAtualizado.getTipoImovel());

            // Atualizar o plano, se necessário
            Optional<Plano> plano = planoService.buscarPorId(clienteAtualizado.getPlano().getId());
            if (plano.isPresent()) {
                cliente.setPlano(plano.get());
            }

            Cliente clienteSalvo = clienteService.salvar(cliente);
            return ResponseEntity.ok(clienteSalvo);
        } else {
            return ResponseEntity.notFound().build();  // Retornar 404 se o cliente não for encontrado
        }
    }

    // Deletar cliente por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        clienteService.deletar(id);
        return ResponseEntity.noContent().build();  // Retornar 204 No Content após deletar
    }
}
