package com.pacotesdeinternet.site_pacote_internet.controller;

import com.pacotesdeinternet.site_pacote_internet.model.Plano;
import com.pacotesdeinternet.site_pacote_internet.service.PlanoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/planos")
public class PlanoController {

    @Autowired
    private PlanoService planoService;

    // Listar todos os planos
    @GetMapping
    public List<Plano> listarTodos() {
        return planoService.listarTodos();
    }

    // Buscar plano por ID
    @GetMapping("/{id}")
    public ResponseEntity<Plano> buscarPorId(@PathVariable Long id) {
        return planoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Criar novo plano
    @PostMapping
    public ResponseEntity<Plano> salvar(@RequestBody Plano plano) {
        Plano planoSalvo = planoService.salvar(plano);
        return ResponseEntity.ok(planoSalvo);  // Retorna o plano salvo com status 200 OK
    }

    // Atualizar um plano existente
    @PutMapping("/{id}")
    public ResponseEntity<Plano> atualizar(@PathVariable Long id, @RequestBody Plano planoAtualizado) {
        Optional<Plano> planoExistente = planoService.buscarPorId(id);
        if (planoExistente.isPresent()) {
            Plano plano = planoExistente.get();
            plano.setNome(planoAtualizado.getNome());
            plano.setVelocidade(planoAtualizado.getVelocidade());
            plano.setPreco(planoAtualizado.getPreco());

            Plano planoSalvo = planoService.salvar(plano);
            return ResponseEntity.ok(planoSalvo);  // Retorna o plano atualizado
        } else {
            return ResponseEntity.notFound().build();  // Retorna 404 se o plano não for encontrado
        }
    }

    // Deletar um plano por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (planoService.buscarPorId(id).isPresent()) {
            planoService.deletar(id);
            return ResponseEntity.noContent().build();  // Retorna 204 No Content se a exclusão for bem-sucedida
        } else {
            return ResponseEntity.notFound().build();  // Retorna 404 se o plano não for encontrado
        }
    }
}
