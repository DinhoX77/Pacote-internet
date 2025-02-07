package com.pacotesdeinternet.site_pacote_internet.service;

import com.pacotesdeinternet.site_pacote_internet.model.Plano;
import com.pacotesdeinternet.site_pacote_internet.repository.PlanoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlanoService {

    @Autowired
    private PlanoRepository planoRepository;

    // Listar todos os planos
    public List<Plano> listarTodos() {
        return planoRepository.findAll();
    }

    // Buscar plano por ID
    public Optional<Plano> buscarPorId(Long id) {
        return planoRepository.findById(id);
    }

    // Salvar ou atualizar um plano
    public Plano salvar(Plano plano) {
        return planoRepository.save(plano);
    }

    // Deletar plano por ID
    public void deletar(Long id) {
        // Verificar se o plano existe antes de deletar
        Optional<Plano> plano = planoRepository.findById(id);
        if (plano.isPresent()) {
            planoRepository.deleteById(id);
        } else {
            throw new RuntimeException("Plano não encontrado com ID: " + id);
        }
    }
}
