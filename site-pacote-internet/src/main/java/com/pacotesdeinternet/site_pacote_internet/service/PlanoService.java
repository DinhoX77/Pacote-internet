package com.pacotesdeinternet.site_pacote_internet.service;

import com.pacotesdeinternet.site_pacote_internet.model.Plano;
import com.pacotesdeinternet.site_pacote_internet.repository.PlanoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanoService {

    @Autowired
    private PlanoRepository planoRepository;

    public List<Plano> listarPlanos() {
        return planoRepository.findAll();
    }

    public Plano cadastrarPlano(Plano plano) {
        return planoRepository.save(plano);
    }

    public void deletarPlano(Long id) {
        planoRepository.deleteById(id);
    }

}